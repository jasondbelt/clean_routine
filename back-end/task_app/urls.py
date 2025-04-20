#Task_APP.URLS
from django.urls import path
from .views import Tasks_by_day, All_tasks, A_task

urlpatterns = [
    path('day/<str:day>/', Tasks_by_day, name='tasks_by_day'),
    path('', All_tasks, name='all_tasks'),
    path('room_id/<int:room_id>/task_id/<int:task_id>/', A_task.as_view(), name='a_task'),
]