#TASK_APP.VIEWS
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Task
from .serializers import AllTasksSerializer, DayTasksSerializer, TaskSerializer
from django.db.models import Case, When, IntegerField
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST
)

# view all tasks
class All_tasks(APIView):
    
    # define custom ordering of days of the week
    @staticmethod
    def day_order():
        days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ]
        return Case(
        *[When(day_of_week=day, then=i) for i, day in enumerate(days)],
        output_field=IntegerField()
    )

    # retrieve all tasks
    def get(self, request):
        # filter by user and order by day of week and time of day
        tasks = Task.objects.filter(user=request.user).order_by(self.day_order(), 'time_of_day')
        # serialize and return as a response
        tasks_ser = AllTasksSerializer(tasks, many=True)
        return Response(tasks_ser.data)
    

# had to use decorator and permission class to be able to authenticate get on front-end
# filter tasks by down by user and day of week and returned in serializer response
# and format it it
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Tasks_by_day(request, day):
    user = request.user
    tasks = Task.objects.filter(user=user, day_of_week=day).order_by('time_of_day')
    tasks_serializer = DayTasksSerializer(tasks, many=True)
    return Response(tasks_serializer.data)


# view all tasks within a specific room, post new tasks
class CR_all_room_tasks(APIView):

    @staticmethod
    def day_order():
        days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ]
        return Case(
        *[When(day_of_week=day, then=i) for i, day in enumerate(days)],
        output_field=IntegerField()
    )

    # retrieve all tasks within a specfic room
    def get(self, request, room_id):
        # filter by room and user, sort order by day of week and time of day
        room_tasks = Task.objects.filter(room=room_id, user=request.user).order_by(self.day_order(), 'time_of_day')
        # serialize and return as a response
        ser_room_tasks = TaskSerializer(room_tasks, many=True)
        return Response(ser_room_tasks.data, status=HTTP_200_OK)
    
    # create a new task in a specific room
    def post(self, request, room_id):
        data = request.data.copy()
        # add room_id to data
        data['room'] = room_id
        # serialize the data
        task_ser = TaskSerializer(data=data)
        # if data is valid, save and return serialized response
        if task_ser.is_valid():
            task_ser.save(user=request.user, room_id=room_id)
            return Response(task_ser.data, status=HTTP_201_CREATED)
        return Response(task_ser.errors, status=HTTP_400_BAD_REQUEST)
    

# retrieve, update, and delete tasks within a specific room
class RUD_room_tasks(APIView):

    # retrive a specific task by id within a specific room
    def get(self, request, room_id, task_id):
        task = get_object_or_404(Task, id=task_id, room=room_id, user=request.user)
        ser_room_task = TaskSerializer(task)
        return Response(ser_room_task.data, status=HTTP_200_OK)
    
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