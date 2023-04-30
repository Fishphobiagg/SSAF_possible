from bs4 import BeautifulSoup
import requests
from datetime import datetime
# from ..models import Article
# import os 
# import django 

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'SSAF.settings')
# django.setup()

url = 'https://medium.com/coupang-engineering/kr/home'
res = requests.get(url)
res.encoding = 'utf-8'
res.raise_for_status()
soup = BeautifulSoup(res.text, 'html.parser')
for data in soup.find_all('div', attrs={'class':'col u-xs-size12of12 js-trackPostPresentation u-paddingLeft12 u-marginBottom15 u-paddingRight12 u-size4of12'}):
    title = data.find('a').get_text()
    content = data.find('a').get_text()
    published_date = data.find('div', attrs={'class':'u-fontSize18 u-letterSpacingTight u-lineHeightTight u-marginTop7 u-textColorNormal u-baseColor--textNormal'}).get_text()
    link = data.find('a')['href']
    article_id = data['data-post-id']
    print(title)