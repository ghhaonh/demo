from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import re_path, path

from .views import EmailExistView, UsernameExistView, UserViewSet

users_list = UserViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

user_detail = UserViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = format_suffix_patterns([
    path('', users_list, name='users-list'),
    re_path(r"^(?P<username>[\w.%+-]+.[A-Za-z0-9.-])/$", user_detail, name='user-detail'),
    re_path(r"^exist-email/(?P<email>[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/$", EmailExistView.as_view()),
    re_path(r"^exist-username/(?P<username>[\w.%+-]+.[A-Za-z0-9.-])/$", UsernameExistView.as_view()),
])