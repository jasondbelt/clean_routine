# TASK_APP.MODEL
from django.db import models
from django.contrib.auth.models import User
from room_app.models import Room
from django.core.exceptions import ValidationError

def validate_day_of_week(value):
    allowed = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    if value.capitalize() not in allowed:
        raise ValidationError(f"{value} is not a valid day of the week.")

# Create your models here.
class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='room_tasks')
    description = models.CharField(max_length=30)
    # Day of the week (e.g., Monday, Tuesday, etc.)
    DAY_CHOICES = [
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
        ('Sunday', 'Sunday'),
    ]
    day_of_week = models.CharField(
        choices=DAY_CHOICES,
        max_length=9,
        validators=[validate_day_of_week]
    )
    # Time of the task on the chosen day
    time_of_day = models.TimeField()
    # Ensure no task is scheduled at the same day and time for the same user
    class Meta:
        unique_together = ('user', 'day_of_week', 'time_of_day')
