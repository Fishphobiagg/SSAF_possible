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

