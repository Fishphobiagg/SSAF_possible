from bs4 import BeautifulSoup
import requests
from datetime import datetime
# import sys
# import io
from ..models import Article
import os 
import django 

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'SSAF.settings')
django.setup()


# 인코딩 설정
# sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
# sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

def line_crawler():
    for i in range(1, 6):
        if i == 1:
            url = 'https://engineering.linecorp.com/ko/blog'
        else:
            url = 'https://engineering.linecorp.com/ko/blog' + f'/page/{i}'
        res = requests.get(url)
        res.encoding = 'utf-8'
        res.raise_for_status()
        soup = BeautifulSoup(res.text, 'html.parser')
        for post in soup.find_all('li', attrs={'class':'post_list_item'}):
            title = post.find('h2').find('a').get_text()
            link = post.find('h2').find('a')['href']
            content = post.find('span', attrs={'class':'text'}).get_text()
            author = post.find('a', attrs={'class':'text_name'}).get_text()
            published_date = post.find('span', attrs={'class':'text_date'}).get_text()
            published_date = datetime.strptime(published_date, '%Y-%M-%d').date()
            article_id = link.split('/')[-1]
            if not Article.objects.filter(article_id=article_id, ent_name='LINE').exists():
                article = Article.objects.create(
                title = title,
                article_id = article_id,
                ent_name = 'LINE',
                published_date = published_date,
                link = link,
                author = author,
                content = content,
                )
                article.save()