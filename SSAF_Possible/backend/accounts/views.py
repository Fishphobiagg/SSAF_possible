from .models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework.decorators import api_view


# Create your views here.
@api_view(['POST'])
def login(request):
    # 일반적으로 서버 측에서는 패스워드에 대해 해싱 처리를 한 뒤에 저장함
    # 그 이유는 해싱 처리를 하지 않으면 서버 개발자는 누구나 사용자의 실제 비밀번호를 확인할 수 있기 때문. 유출되었을 때도 문제 발생
    # 해싱이란 단방향 암호화를 의미. 동일한 문자열을 동일한 해시 함수로 해싱 처리하면 항상 같은 암호화된 문자열이 반환
    user = authenticate(request, username=request.POST.get('username'), password=request.POST.get('password'))
    if user:
        login(request, user)
    else:
        return JsonResponse({'message':'로그인 실패! 아디, 비번 확인해주세요'})
def logout(request):
    logout(request)

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