from bs4 import BeautifulSoup
import requests
import django 
import os
from . .models import Article
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
from selenium.webdriver.common.by import By
from datetime import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'SSAF.settings')
django.setup()


def crawl_data():
    # kakao
    # 주석으로 분리하지 말고 함수로 따로 빼서 선언한 다음 해당 함수에서 따로 뺀 함수를 호출하는 식으로 하면 가독성 측면이나 유지 보수 측면에서 더 좋을듯
    for i in range(1, 6):
        url = 'https://tech.kakao.com/blog/' + 'page' + '/' + str(i) + '/'    
        res = requests.get(url)
        res.raise_for_status()
        soup = BeautifulSoup(res.text, 'html.parser')
        for k in soup.find_all('article')[3:]:
            article_id = k['class'][2].split('-')[1]
            title = k.find('h3').get_text().strip()
            link = k.find('h3').find('a')['href']
            author = k.find('span', attrs={'class':'elementor-post-author'}).get_text().strip()
            content = k.find('div', attrs={'class':'elementor-post__excerpt'}).find('p').get_text()
            published_date = k.find('span', attrs={'class':'elementor-post-date'}).get_text().strip()
            if not Article.objects.filter(article_id=article_id, ent_name='KAKAO').exists():
                # Create a new MyModel instance and save it to the database
                article = Article.objects.create(
                    title=title,
                    article_id=article_id,
                    ent_name='KAKAO',
                    published_date= datetime.strptime(published_date, '%Y.%m.%d').date(),
                    link=link,
                    author=author,
                    content=content,
                )
                article.save()
    # #LINE
    # for i in range(1, 6):
    #     if i == 1:
    #         url = 'https://engineering.linecorp.com/ko/blog'
    #     else:
    #         url = 'https://engineering.linecorp.com/ko/blog' + f'/page/{i}'
    #     res = requests.get(url)
    #     res.raise_for_status()
    #     soup = BeautifulSoup(res.text, 'html.parser')
    #     print(url)
    #     for k in soup.find_all('li', attrs={'class':'post_list_item'}):
    #         title = k.find('h2').find('a').get_text()
    #         link = k.find('h2').find('a')['href']
    #         article_id = title
    #         text_area = k.find('div', attrs={'class':'text_area'})
    #         author = text_area.find('a', attrs={'class':'text_name'}).get_text()
    #         content = k.find('span', attrs={'class':'text'}).get_text()
    #         published_date = text_area.find('span').get_text()
    #         print(title, link, content,)
    #     if not Article.objects.filter(article_id=article_id, ent_name='LINE').exists():
    #             # Create a new MyModel instance and save it to the database
    #             article = Article.objects.create(
    #                 title=title,
    #                 article_id=article_id,
    #                 ent_name='LINE',
    #                 published_date=published_date,
    #                 link=link,
    #                 author=author,
    #                 content=content,
    #             )
    
    
    # 우아한 형제들 기술블로그

    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36")
    options.add_argument('--headless')
    driver = webdriver.Chrome('./chromedriver', options=options)
    driver.get('https://techblog.woowahan.com')

    for _ in range(5):
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        for k in soup.find_all('div', attrs={'class': 'item'}):
            title = k.find('a').find('h1').get_text()
            link = k.find('a')['href']
            article_id = link.split('/')[-2] + 'woowahan'
            published_date = k.find('a').find('p').find('span').get_text().strip()
            author = k.find('a').find('p').select_one('span:ntH-of-type(2)').get_text().strip()
            content = k.find('a').select_one('p:nth-of-type(2)').get_text()
            published_date = datetime.strptime(published_date, "%b.%d.%Y").date()

            if not Article.objects.filter(article_id=article_id, ent_name='woowahan').exists():
                article = Article.objects.create(
                title = title,
                article_id = article_id,
                ent_name = 'woowahan',
                published_date = published_date,
                link = link,
                author = author,
                content = content,
                )
                article.save()
        time.sleep(1)
        next = driver.execute_script("return document.querySelector('a.nextpostslink')")
        next.click()
    # 우아한 형제들 기술블로그

    options = webdriver.ChromeOptions()
    # options.add_argument('--headless')
    driver = webdriver.Chrome('./chromedriver')

    driver.get('https://techblog.woowahan.com/page/5/')



    for _ in range(5):
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        for k in soup.find_all('div', attrs={'class':'item'}):
            title = k.find('a').find('h1').get_text()
            link = k.find('a')['href']
            article_id = link.split('/')[-2] + 'woowahan'
            published_date = k.find('a').find('p').find('span').get_text().strip()
            author = k.find('a').find('p').select_one('span:ntH-of-type(2)').get_text().strip()
            content = k.find('a').select_one('p:nth-of-type(2)').get_text()
            print(author)
            print(content)


                # article.save()
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
