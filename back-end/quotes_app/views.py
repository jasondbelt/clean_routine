#QUOTES_APP.VIEWS
import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
# allow any user (authenticated or not) to access this endpoint
@permission_classes([AllowAny])
def Get_random_quote(request):
    # make get request to external quote API
    try:
        response = requests.get('https://qapi.vercel.app/api/random')
        # if successful, return quote data as JSON Response
        if response.status_code == 200:
            data = response.json()
            return Response({
                'id': data.get('id'),
                'quote': data.get('quote'),
                'author': data.get('author'),
            })
        else:
            # if external API fails, return failure response
            return Response({'error': 'Failed to fetch quote'}, status=status.HTTP_400_BAD_REQUEST)
    # catch all other request-related exceptions, return failure response
    except requests.exceptions.RequestException as e:
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)