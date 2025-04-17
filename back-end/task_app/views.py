#TASK_APP.VIEWS
from django.shortcuts import render, get_object_or_404
import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Task
from .serializers import AllTasksSerializer, TaskSerializer
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST
)


class All_tasks(APIView):

    def get(self, request):
        tasks = Task.objects.filter(user=request.user)
        tasks_ser =  AllTasksSerializer(tasks, many=True)
        return Response(tasks_ser.data)
    

class All_room_tasks(APIView):

    def get(self, request, room_id):
        room_tasks = Task.objects.filter(room=room_id, user=request.user)
        ser_room_tasks = TaskSerializer(room_tasks, many=True)
        return Response(ser_room_tasks.data, status=HTTP_200_OK)
    

    def post(self, request, room_id):
        data = request.data.copy()
        data['room'] = room_id
        task_ser = TaskSerializer(data=request.data)
        if task_ser.is_valid():
            task_ser.save(user=request.user, room_id=room_id)
            return Response(task_ser.data, status=HTTP_201_CREATED)
        return Response(task_ser.errors, status=HTTP_400_BAD_REQUEST)
    

    def put(self, request, room_id):
        data = request.data.copy()
        task_id = data.get('id')
        task = get_object_or_404(Task, id=task_id, room=room_id, user=request.user)
        task_ser = TaskSerializer(task, data=data, partial=True)

        if task_ser.is_valid():
            task_ser.save()
            return Response(task_ser.data, status=HTTP_200_OK)

        return Response(task_ser.errors, status=HTTP_400_BAD_REQUEST)


    def delete(self, request, room_id):
        task_id = request.data.get('id')
        task = get_object_or_404(Task, id=task_id, room=room_id, user=request.user)
        task.delete()
        return Response(status=HTTP_204_NO_CONTENT)