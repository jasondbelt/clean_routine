#ROOM_APP.VIEWS
import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


# @permission_classes([IsAuthenticated])
class All_rooms(APIView):

    def get(self, request):
        pass
    # try:
    #     response = requests.get('https://qapi.vercel.app/api/random')

    #     if response.status_code == 200:
    #         data = response.json()
    #         return Response({
    #             'id': data.get('id'),
    #             'quote': data.get('quote'),
    #             'author': data.get('author'),
    #         })
    #     else:
    #         return Response({'error': 'Failed to fetch quote'}, status=status.HTTP_400_BAD_REQUEST)

    # except requests.exceptions.RequestException as e:
    #     return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)