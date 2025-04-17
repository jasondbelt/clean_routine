#Task_APP.URLS
from django.urls import path
from .views import All_tasks, CR_all_room_tasks, RUD_room_tasks

urlpatterns = [
    path('', All_tasks.as_view(), name='all_tasks'),
    path('room_id/<int:room_id>/', CR_all_room_tasks.as_view(), name='cr_all_room_tasks'),
    path('room_id/<int:room_id>/task_id/<int:task_id>/', RUD_room_tasks.as_view(), name='ud_room_tasks'),
]