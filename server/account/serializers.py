from datetime import datetime
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer

from .models import Account

class AccountAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'is_active', 'is_staff', 'last_login', 'created_at', 'updated_at', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['id'] = self.user.id
        data['username'] = self.user.username
        data['email'] = self.user.email
        data['first_name'] = self.user.first_name
        data['last_name'] = self.user.last_name
        data['is_staff'] =self.user.is_staff
        data['is_superuser'] =self.user.is_superuser
        data['expires_at'] = int(datetime.now().timestamp() + refresh.access_token.lifetime.seconds)

        return data

class MyTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        refresh = self.token_class(attrs["refresh"])
        expires_at = int(datetime.now().timestamp() + refresh.access_token.lifetime.seconds)
        data = {"access": str(refresh.access_token), "expires_at": expires_at}
        return data