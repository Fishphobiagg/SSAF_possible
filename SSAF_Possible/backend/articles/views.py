from rest_framework.decorators import api_view
from django.shortcuts import render
from .utils.crawler import crawl_data
from .models import Article
from .serializers import ArticleListSerializer, ScrapListSerializer
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from .utils.line_crawler import line_crawler
from rest_framework.response import Response

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

@api_view(['POST'])
def scrap(request, article_pk):
    if request.method == 'POST':
        if request.user.is_authenticated:
            article = Article.objects.get(pk=article_pk)
            user = request.user
            if article.scrap_users.filter(pk=user.pk).exists():
                article.scrap_users.remove(user)
            else:
                article.scrap_users.add(user)
            return Response(ScrapListSerializer(user.scrap_articles.all(), many=True).data)
    # 프론트에서 로그인하지 않은 유저는 스크랩을 못하도록 처리

@api_view(['GET'])
def scrap_list(request):
    user = request.user
    articles = user.scrap_articles.all()
    serializer = ScrapListSerializer(articles, many=True)
    return Response(serializer.data)