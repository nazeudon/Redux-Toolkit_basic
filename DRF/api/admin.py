from django.contrib import admin
from .models import Task


admin.site.register(Task)  # adminのダッシュボーで見れるように登録
