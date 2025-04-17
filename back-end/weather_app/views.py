#USER_APP.VIEWS
import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
# from requests_oauthlib import OAuth1
# import env variables from django settings
from clean_routine_project.settings import env


@api_view(['GET'])
# allow any user (authenticated or not to use), though they
# wouldn't be able to access this route in the frontend anyway
@permission_classes([AllowAny])
def Get_forecast(request, city):
    # get weather API KEy from env file
    auth = env.get("WEATHER_API_KEY")
    # build api endpoint using the provided city and API Key
    endpoint = f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={auth}"
    
    # make get request to weather API
    try:
        response = requests.get(endpoint)
        
        if response.status_code == 200:
            data = response.json()
            # print(data)
            # structures data to send back in response
            return Response({
                'location': data.get('name'),
                'weather': data['weather'][0].get('main'),
                'description': data['weather'][0].get('description'),
                'temperature': data['main'].get('temp'),
                'humidity': data['main'].get('humidity'),
                'wind speed': data['wind'].get('speed'),
            })
        else:
            # return error message if external sources fails, return failure response
            return Response({'error': 'Failed to fetch forecast'}, status=status.HTTP_400_BAD_REQUEST)

    # catch all other error-related requests
    except requests.exceptions.RequestException as e:
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)