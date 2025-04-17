# ROOM_APP.MODEL
from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

# validator ensures room names are capitalized
def validate_capitalized(value):
    if value != value.capitalize():
        raise ValidationError('Room name must be capitalized (e.g., "Kitchen").')

# Create your models here.
class Room(models.Model):
    # each room linked to a specific user
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rooms')
    room_name = models.CharField(
        max_length=20,
        validators=[validate_capitalized]
    )
    # optional image field
    image = models.ImageField(blank=True, null=True)

    # prevents user from having duplicate room names
    class Meta:
        unique_together = ('user', 'room_name')

    # str repr for admin interface and debugging
    def __str__(self):
        return f"{self.id} {self.room_name} ({self.user.username})"
