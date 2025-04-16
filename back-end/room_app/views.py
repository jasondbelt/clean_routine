#ROOM_APP.VIEWS
from django.shortcuts import render, get_object_or_404
import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import Room, RoomSerializer
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST
)



# @permission_classes([IsAuthenticated])
class All_rooms(APIView):

    def get(self, request):
        rooms = Room.objects.filter(user=request.user)
        rooms_ser =  RoomSerializer(rooms, many=True)
        return Response(rooms_ser.data)
    
 
class A_room(APIView):

    def get_room(self, request, roomname):
        return get_object_or_404(Room, room_name__iexact=roomname)
    
    def get(self, request, roomname):
        ser_room = RoomSerializer(self.get_room(request, roomname))
        return Response(ser_room.data, status=HTTP_200_OK)
    
    def post(self, request, roomname):
        ser_room = RoomSerializer(data=request.data)
        if ser_room.is_valid():
            ser_room.save(user=request.user)
            return Response(ser_room.data, status=HTTP_201_CREATED)
        return Response(ser_room.errors, status=HTTP_400_BAD_REQUEST)
    
    def put(self, request, roomname):
        room = self.get_room(request, roomname)
        ser_room = RoomSerializer(room, data=request.data, partial=True)
        if ser_room.is_valid():
            ser_room .save()
            return Response(ser_room.data, status=HTTP_400_BAD_REQUEST)
        return Response(ser_room.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, roomname):
        room = self.get_room(request, roomname)
        room.delete()
        return Response(status=HTTP_204_NO_CONTENT)