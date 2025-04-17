#ROOM_APP.VIEWS
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Room
from .serializers import RoomSerializer
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST
)

# view all rooms belonging to authenticated user
class All_rooms(APIView):

    def get(self, request):
        # filter rooms by currently logged in user
        rooms = Room.objects.filter(user=request.user)
        # serialize and return JSON response
        rooms_ser =  RoomSerializer(rooms, many=True)
        return Response(rooms_ser.data)
    

# views to handle CRUD for a single room
class A_room(APIView):

    # get room by name (case-insensitive) for current user
    def get_room(self, request, room_name):
        return get_object_or_404(Room, room_name__iexact=room_name, user=request.user)

    # retrieve single room's details by name
    def get(self, request, room_name):
        room = self.get_room(request, room_name)
        ser_room = RoomSerializer(room)
        return Response(ser_room.data, status=HTTP_200_OK)

    # create new room, save/attach it to user if valid
    def post(self, request, room_name):
        data = request.data.copy()
        ser_room = RoomSerializer(data=data)
        if ser_room.is_valid():
            ser_room.save(user=request.user)
            return Response(ser_room.data, status=HTTP_201_CREATED)
        return Response(ser_room.errors, status=HTTP_400_BAD_REQUEST)

    # update an existing room by roomname (partial update allowed)
    def put(self, request, room_name):
        room = self.get_room(request, room_name)
        data = request.data.copy()
        ser_room = RoomSerializer(room, data=data, partial=True)
        if ser_room.is_valid():
            ser_room.save()
            return Response(ser_room.data, status=HTTP_201_CREATED)
        return Response(ser_room.errors, status=HTTP_400_BAD_REQUEST)

    # delete existing room by roomname
    def delete(self, request, room_name):
        room = self.get_room(request, room_name)
        room.delete()
        return Response(status=HTTP_204_NO_CONTENT)