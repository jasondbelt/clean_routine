#Task_APP.URLS
from django.urls import path
from .views import All_room_tasks

urlpatterns = [
    path('', All_room_tasks.as_view(), name='room_tasks'),
]