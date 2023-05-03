from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    # 왜 None?
    last_name = None
    first_name = None