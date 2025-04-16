#ROOM_APP.SERIALIZERS
from .models import Task
from rest_framework import serializers

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ['room', 'description', 'day_of_week', 'time_of_day']