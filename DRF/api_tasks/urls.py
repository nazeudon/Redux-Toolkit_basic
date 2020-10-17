from django.contrib import admin
from django.urls import path
from django.conf.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # apiのpathに対してはapi/urls.pyを参照するようにする
    # authen/jwt/createにアクセスするとjwtトークンを生成
    path('authen/', include('djoser.urls.jwt'))
]
