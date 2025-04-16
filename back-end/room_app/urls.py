#ROOM_APP.URLS
from django.urls import path
from .views import All_rooms, A_room

urlpatterns = [
    path('', All_rooms.as_view(), name='all_rooms'),
    path('roomname/<str:roomname>/', A_room.as_view(), name='room'),
]