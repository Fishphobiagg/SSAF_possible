from django.urls import path
from . import views


urlpatterns = [
    path('articles/', views.article_list),
    path('search/<search_keyword>', views.search),
    path('search/<ent>', views.ent_tag),
]
