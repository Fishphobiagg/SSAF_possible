from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .utils.crawler import crawl_data
from .models import Article
from .serializers import ArticleListSerializer
# Create your views here.

@api_view(['GET'])
def article_list(request):
    crawl_data()
    articles = Article.objects.all()
    selializer = ArticleListSerializer(articles, many=True)
    return Response(selializer.data)

def article(request, article_pk):
    pass