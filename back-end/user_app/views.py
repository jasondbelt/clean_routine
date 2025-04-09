#USER_APP.VIEWS
from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import Note, NoteSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notes(request):
    user = request.user
    notes = Note.objects.filter(owner=user)
    note_serializer = NoteSerializer(notes, many=True)
    return Response(note_serializer.data)