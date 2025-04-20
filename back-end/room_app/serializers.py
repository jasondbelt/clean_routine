from .models import Room
from task_app.serializers import TaskSerializer
from rest_framework import serializers
from django.db.models import Case, When, IntegerField

class RoomSerializer(serializers.ModelSerializer):
    room_tasks = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = ['room_name', 'image_url', 'room_tasks']

    # Define custom day order for sorting
    @staticmethod
    def day_order():
        days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        return Case(
            *[When(day_of_week=day, then=i) for i, day in enumerate(days)],
            output_field=IntegerField()
        )

    def get_room_tasks(self, obj):
        # Sorting room_tasks by custom day order and time_of_day
        sorted_tasks = obj.room_tasks.all().order_by(self.day_order(), 'time_of_day')
        return TaskSerializer(sorted_tasks, many=True).data


