# データベースとブラウザの入出力関係をカスタマイズする役割
from rest_framework import serializers
from .models import Task
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # カスタマイズする元のモデル
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    # デフォルト設定から変更したい項目をcreate関数でオーバーライドする
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)  # パスワードはハッシュ化
        return user


class TaskSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Task
        fields = ('id', 'title', 'created_at', 'updated_at')
