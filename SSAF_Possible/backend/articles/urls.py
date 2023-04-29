from django.urls import path
from . import views


urlpatterns = [
    path('articles/', views.article_list),
    path('search/<search_keyword>', views.search),
    path('search/<ent>', views.ent_tag),
    path('scraps/', views.scrap_list),
    path('scrap/<article_pk>', views.scrap),
]
