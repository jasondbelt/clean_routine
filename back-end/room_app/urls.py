#ROOM_APP.URLS
from django.urls import path
from .views import All_rooms

urlpatterns = [
    path('', All_rooms.as_view(), name='room'),
]