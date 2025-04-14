#USER_APP.VIEWS
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests

# Create your views here.
# @api_view(['GET'])
# def Get_random_quote(request):
#     try:
#         # Make the API call to zenquotes.io
#         response = requests.get('https://zenquotes.io/api/random/')
        
#         # If the request was successful, parse the response JSON
#         if response.status_code == 200:
#             quote_data = response.json()
#             quote = quote_data[0]['q']
#             author = quote_data[0]['a']
#             # Return the quote and author as a response
#             return Response({'quote': quote, 'author': author})
#         else:
#             # Handle the case where the API request fails
#             return Response({'error': 'Failed to retrieve quote from the API'}, status=status.HTTP_404_NOT_FOUND)
#     except requests.exceptions.RequestException as e:
#         # Catch any errors that happen during the request
#         return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
import requests
import random
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
@permission_classes([AllowAny])
def Get_random_quote(request):
    try:
        random_id = random.randint(1, 1010)  # Adjust max based on latest gen
        response = requests.get(f'https://pokeapi.co/api/v2/pokemon/{random_id}/')

        if response.status_code == 200:
            data = response.json()
            name = data['name']
            sprite = data['sprites']['front_default']
            types = [t['type']['name'] for t in data['types']]
            return Response({
                'name': name,
                'sprite': sprite,
                'types': types
            })
        else:
            return Response({'error': 'Failed to retrieve Pokémon'}, status=status.HTTP_404_NOT_FOUND)

    except requests.exceptions.RequestException as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
