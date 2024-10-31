from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework import status
from rest_framework.decorators import action

from .models import Account
from .serializers import AccountAdminSerializer

class UserViewSet(ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountAdminSerializer
    permission_classes = [IsAdminUser]

    lookup_field = 'username'
    
    @action(methods=['post'], detail=True, url_path='inactive', url_name='inactive')
    def inactive(self, reuqest, username):
        try:
           user = Account.objects.get(username=username)
           user.is_active = False
           user.save()
        except Account.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(data=AccountAdminSerializer(user).data, status=status.HTTP_200_OK)
    
    @action(methods=['post'], detail=True, url_path='active', url_name='active')
    def active(self, reuqest, username):
        try:
           user = Account.objects.get(username=username)
           user.is_active = True
           user.save()
        except Account.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(data=AccountAdminSerializer(user).data, status=status.HTTP_200_OK)

class EmailExistView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, email):
        try:
           user = Account.objects.filter(email=email).exists()
        except Account.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(user)
    
class UsernameExistView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, username):
        try:
           user = Account.objects.filter(username=username).exists()
        except Account.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(user)