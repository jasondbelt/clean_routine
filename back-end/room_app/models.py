# ROOM_APP.MODEL
import re
from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

# validator ensures room names are capitalized
def validate_capitalized(value):
    if value != value.capitalize():
        raise ValidationError('Room name must be capitalized (e.g., "Kitchen").')
    
# Validator to ensure the URL points to an image
def validate_image_url(value):
    # Regular expression to match common image file extensions
    image_url_pattern = r'http(s)?://.*\.(jpg|jpeg|png|gif|bmp|webp)$'
    
    if not re.match(image_url_pattern, value, re.IGNORECASE):
        raise ValidationError('The URL must point to a valid image file (e.g., .jpg, .jpeg, .png, .gif).')

# Create your models here.
class Room(models.Model):
    # each room linked to a specific user
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rooms')
    room_name = models.CharField(
        max_length=20,
        validators=[validate_capitalized]
    )
    # optional image field
    image_url = models.URLField(
        blank=True,
        validators=[validate_image_url],
        default='https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png'
    )

    # prevents user from having duplicate room names
    class Meta:
        unique_together = ('user', 'room_name')

    # str repr for admin interface and debugging
    def __str__(self):
        return f"{self.id} {self.room_name} ({self.user.username})"