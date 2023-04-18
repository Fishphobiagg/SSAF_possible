from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .utils.crawler import crawl_data
from .models import Article
from .serializers import ArticleListSerializer
from django.core.paginator import Paginator
from rest_framework.pagination import PageNumberPagination

class ArticlePagination(PageNumberPagination):
    page_size = 10
    page_query_param = 'page'
    page_size_query_param = 'per_page'
    max_page_size = 100

@api_view(['GET'])
def article_list(request):
    articles = Article.objects.order_by('published_date')
    paginator = ArticlePagination()
    result_page = paginator.paginate_queryset(articles, request)
    serializer = ArticleListSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)
