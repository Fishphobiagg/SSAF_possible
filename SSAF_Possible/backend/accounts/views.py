from .models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.

@api_view(['POST'])
def password_change(request):
    # 비밀번호 바꿔주는 로직 치고는 너무 간단하지 않나?
    # 기존 비밀번호를 입력하여 불순한 요청에 대한 에러 처리가 필요해보임
    user = User.objects.get(pk=request.user.pk)
    user.password = request.POST['password']
    user.save()
    return JsonResponse({'message':'비밀번호 변경 성공!'})

@api_view(['POST'])
def email_change(request):
    user = User.objects.get(pk=request.user.pk)
    user.email = request.POST['email']
    user.save()
    return JsonResponse({'message':'이메일 변경 성공!'})