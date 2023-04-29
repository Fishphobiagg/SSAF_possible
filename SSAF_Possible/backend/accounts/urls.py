from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login),
    path('logout', views.logout),
    path('email_change', views.email_change),
    path('password_change', views.password_change),
]
