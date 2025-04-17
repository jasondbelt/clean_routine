#Task_APP.URLS
from django.urls import path
from .views import All_tasks, All_room_tasks

urlpatterns = [
    path('', All_tasks.as_view(), name='all_tasks'),
    path('room_id/<int:room_id>/', All_room_tasks.as_view(), name='all_room_tasks'),
]