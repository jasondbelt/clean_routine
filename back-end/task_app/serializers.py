#TASK_APP.SERIALIZERS
from .models import Task
from rest_framework import serializers
    
# return all tasks by day
class DayTasksSerializer(serializers.ModelSerializer):
    # custom field returns room name with method below
    room = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['room', 'description', 'time_of_day']

    # retrieves and returns room name in serializer
    def get_room(self, obj):
        return obj.room.room_name


# returns all task fields for full access
class TaskSerializer(serializers.ModelSerializer):
    # redefine new field to have access to roomname
    room_name = serializers.CharField(source='room.room_name', read_only=True)

    class Meta:
        model = Task
        fields = [
            'id',
            'user_id',
            'room_id',
            'room_name',
            'description',
            'day_of_week',
            'time_of_day',
        ]
        read_only_fields = ['id', 'user', 'room_name']
