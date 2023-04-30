from .models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework.decorators import api_view


# Create your views here.
@api_view(['POST'])
def login(request):
    user = authenticate(request, username=request.POST.get('username'), password=request.POST.get('password'))
    if user:
        login(request, user)
    else:
        return JsonResponse({'message':'로그인 실패! 아디, 비번 확인해주세요'})
def logout(request):
    logout(request)

@api_view(['POST'])
def password_change(request):
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