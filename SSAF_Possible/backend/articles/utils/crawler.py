from bs4 import BeautifulSoup
import requests
import django 
import os
from . .models import Article

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'SSAF.settings')
django.setup()


def crawl_data():
    # kakao
    for i in range(1, 6):
        url = 'https://tech.kakao.com/blog/' + 'page' + '/' + str(i) + '/'    
        res = requests.get(url)
        res.raise_for_status()
        soup = BeautifulSoup(res.text, 'html.parser')
        for k in soup.find_all('article')[3:]:
            article_id = k['class'][2].split('-')[1]
            title = k.find('h3').get_text()
            link = k.find('h3').find('a')['href']
            author = k.find('span', attrs={'class':'elementor-post-author'}).get_text()
            content = k.find('div', attrs={'class':'elementor-post__excerpt'}).find('p').get_text()
            published_date = k.find('span', attrs={'class':'elementor-post-date'}).get_text()
            print(link, type(link))
            if not Article.objects.filter(title=title, article_id=article_id, ent_name='KAKAO').exists():
                # Create a new MyModel instance and save it to the database
                article = Article.objects.create(
                    title=title,
                    article_id=article_id,
                    ent_name='KAKAO',
                    published_date=published_date,
                    link=link,
                    author=author,
                    content=content,
                )
                article.save()
    for i in range(1, 6):
        url = 'https://engineering.linecorp.com/ko/blog'
        res = requests.get(url)
        res.raise_for_status()
        soup = BeautifulSoup(res.text, 'html.parser')
    # elif enterprise == 'woowahan':
    #     url = 'https://techblog.woowahan.com/'
    #     res = requests.get(url)
    #     res.raise_for_status()
    #     soup = BeautifulSoup(res.text, 'html.parser')   
    # elif enterprise == 'NAVER':
    #     url = 'https://d2.naver.com/helloworld'
    #     res = requests.get(url)
    #     res.raise_for_status()
    #     soup = BeautifulSoup(res.text, 'html.parser')
    return
