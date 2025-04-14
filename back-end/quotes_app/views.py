#USER_APP.VIEWS
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests

# Create your views here.
@api_view(['GET'])
def Get_random_quote(request):
    try:
        # Make the API call to zenquotes.io
        response = requests.get('https://zenquotes.io/api/random/')
        
        # If the request was successful, parse the response JSON
        if response.status_code == 200:
            quote_data = response.json()
            quote = quote_data[0]['q']
            author = quote_data[0]['a']
            # Return the quote and author as a response
            return Response({'quote': quote, 'author': author})
        else:
            # Handle the case where the API request fails
            return Response({'error': 'Failed to retrieve quote from the API'}, status=status.HTTP_404_NOT_FOUND)
    except requests.exceptions.RequestException as e:
        # Catch any errors that happen during the request
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)