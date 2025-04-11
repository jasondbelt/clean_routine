#USER_APP.VIEWS
from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import Note, NoteSerializer, UserRegistrationSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Create your views here.
# custom class overrides default class to set tokens in cookies
# {"username": "add username", "password": "add password"}
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            # calls parent's class 'post to generate access and refresh tokens
            tokens = super().post(request, *args, **kwargs).data

            # create response with success data
            res = Response({'success': True})

            # set both tokens as cookies in response object
            res.set_cookie(
                key='access_token',
                value=tokens['access'],
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            res.set_cookie(
                key='refresh_token',
                value=tokens['refresh'],
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            # return the success response with cookies set
            return res
        except:
            return Response({'success': False})


@api_view(['POST'])
def Log_out(request):
    try:
        res = Response()
        res.data = {'success': True}
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite='None')
        return res
    except:
        return Response({'success': False})


# {"username": "add username", "email": "add email": "password": "add password"}
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Get_notes(request):
    user = request.user
    notes = Note.objects.filter(owner=user)
    note_serializer = NoteSerializer(notes, many=True)
    return Response(note_serializer.data)