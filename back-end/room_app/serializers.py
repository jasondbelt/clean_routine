#ROOM_APP.SERIALIZERS
from .models import Room
from task_app.serializers import Task, TaskSerializer
from rest_framework import serializers

class RoomSerializer(serializers.ModelSerializer):
    room_tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Room
        fields = ['room_name', 'image', 'room_tasks']

