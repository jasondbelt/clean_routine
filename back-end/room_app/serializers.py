from .models import Room
from task_app.serializers import TaskSerializer
from rest_framework import serializers
from django.db.models import Case, When, IntegerField

class RoomSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Room
        fields = ['id', 'room_name', 'image_url']