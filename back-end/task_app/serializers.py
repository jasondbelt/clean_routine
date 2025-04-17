#ROOM_APP.SERIALIZERS
from .models import Task
from rest_framework import serializers

class AllTasksSerializer(serializers.ModelSerializer):
    room = serializers.SerializerMethodField()


    class Meta:
        model = Task
        fields = ['room', 'description', 'day_of_week', 'time_of_day']

    def get_room(self, obj):
        return obj.room.room_name


class TaskSerializer(serializers.ModelSerializer):
    task_id = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Task
        fields = ['task_id', 'description', 'day_of_week', 'time_of_day']