from django.urls import path
from . import views


urlpatterns = [
    # 전체 url 파일에 남겼던 리뷰와 마찬가지로 REST API에 대해 한번 공부해보면 좋을 듯. 공부해보면 뭐가 잘못되었는지 대충은 보일듯
    path('list/', views.article_list),
    path('search/<search_keyword>', views.search),
    path('search/<ent>', views.ent_tag),
    path('scrap/list', views.scrap_list),
    path('scrap/<article_pk>', views.scrap),
]
