#USER_APP.SERIALIZERS
from rest_framework import serializers
from .models import Note
from django.contrib.auth.models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    # ensure password is write-only and not returned in API response
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    # custom method to hash password correctly, invoked upon successful registration
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model=User
        fields=['username']

# used for test purposes
class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model=Note
        fields=['id', 'description']