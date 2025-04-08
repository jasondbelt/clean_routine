#USER_APP.URLS
from django.urls import path
from .views import Sign_up

urlpatterns = [
    path('signup/', Sign_up.as_view(), name='signup'),
]