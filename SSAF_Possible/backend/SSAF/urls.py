"""SSAF URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # techblog 라우터에만 api 경로를 추가한 이유가 뭔지 궁금
    # 또한 디렉터리는 article로 작명했는데 여기선 왜 techblog 인지도 궁금
    # 마지막으로 REST API 에서는 복수형(~s)를 권장하지 않음. REST API의 개념에 대해 조금 공부해보면 좋을 것. REST API는 일종의 약속 같은건데 잘 지킬 경우 협업이나 회사에서 도움이 될 것
    path('api/techblog/', include('articles.urls')),
    path('accounts/', include('accounts.urls')),
]
