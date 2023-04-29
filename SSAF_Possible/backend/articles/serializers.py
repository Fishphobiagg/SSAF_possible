from rest_framework import serializers
from .models import Article

class ArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('title', 'ent_name', 'author', 'content', 'published_date', 'link', 'id')

class ScrapListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('title', 'link', 'id', 'ent_name')