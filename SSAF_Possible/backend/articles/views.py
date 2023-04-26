from rest_framework.decorators import api_view
from django.shortcuts import render
from .utils.crawler import crawl_data
from .models import Article
from .serializers import ArticleListSerializer
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from .utils.line_crawler import line_crawler

class ArticlePagination(PageNumberPagination):
    page_size = 10
    page_query_param = 'page'
    page_size_query_param = 'per_page'
    max_page_size = 100

@api_view(['GET'])
def article_list(request):
    # crawl_data()
    # line_crawler()
    articles = Article.objects.order_by('-published_date')
    paginator = ArticlePagination()
    result_page = paginator.paginate_queryset(articles, request)
    serializer = ArticleListSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def search(reqeust, search_keyword):
    articles = Article.objects.filter(Q(content__icontains=search_keyword)|Q(title__icontains=search_keyword)).order_by('-published_date')
    paginator = ArticlePagination()
    result_page = paginator.paginate_queryset(articles, reqeust)
    serializer = ArticleListSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def ent_tag(request, ent):
    articles = Article.objects.filter(ent_name=ent)
    paginator = ArticlePagination()
    result_page = paginator.paginate_queryset(articles, request)
    serializer = ArticleListSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)