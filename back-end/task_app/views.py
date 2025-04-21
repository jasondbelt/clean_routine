#TASK_APP.VIEWS
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Task
from .serializers import DayTasksSerializer, TaskSerializer
from django.db.models import Case, When, IntegerField
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST
)

# utilized o Schedule Page for getting tasks by day
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Tasks_by_day(request, day):
    user = request.user
    tasks = Task.objects.filter(user=user, day_of_week=day).order_by('time_of_day')
    tasks_serializer = DayTasksSerializer(tasks, many=True)
    return Response(tasks_serializer.data)


# define custom ordering of days of the week
@staticmethod
def day_order():
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ]
    return Case(
    *[When(day_of_week=day, then=i) for i, day in enumerate(days)],
    output_field=IntegerField()
)

# retrieves all tasks by user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def All_tasks(request):
    tasks = Task.objects.filter(user=request.user).order_by(day_order(), 'time_of_day')
    # serialize and return as a response
    tasks_ser = TaskSerializer(tasks, many=True)
    return Response(tasks_ser.data)
    

class A_task(APIView):

    def post(self, request, room_id, task_id=None):
        data = request.data.copy()
        data['room'] = room_id 
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user, room_id=room_id)
            return Response(serializer.data, status=HTTP_201_CREATED)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    
    # update the specific task
    def put(self, request, room_id, task_id):
        data = request.data.copy()
        task = get_object_or_404(Task, id=task_id, room=room_id, user=request.user)
        task_ser = TaskSerializer(task, data=data, partial=True)
        
        # if data is valid, save and return success response
        if task_ser.is_valid():
            task_ser.save()
            return Response(task_ser.data, status=HTTP_201_CREATED)

        return Response(task_ser.errors, status=HTTP_400_BAD_REQUEST)

    # delete the specific task utilizing room and task ids
    def delete(self, request, room_id, task_id):
        task = get_object_or_404(Task, id=task_id, room=room_id, user=request.user)
        task.delete()
        return Response(status=HTTP_204_NO_CONTENT)