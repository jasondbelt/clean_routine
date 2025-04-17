#TASK_APP.SERIALIZERS
from .models import Task
from rest_framework import serializers

# return all tasks
class AllTasksSerializer(serializers.ModelSerializer):
    # custom field returns room name with method below
    room = serializers.SerializerMethodField()


    class Meta:
        model = Task
        fields = ['room', 'description', 'day_of_week', 'time_of_day']

    # retrieves and returns room name in serializer
    def get_room(self, obj):
        return obj.room.room_name


class TaskSerializer(serializers.ModelSerializer):
    # utilized to refer to task.id as task_id in serializer
    task_id = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Task
        fields = ['task_id', 'description', 'day_of_week', 'time_of_day']