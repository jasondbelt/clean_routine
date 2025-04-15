#USER_APP.VIEWS
import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from requests_oauthlib import OAuth1
from clean_routine_project.settings import env


@api_view(['GET'])
@permission_classes([AllowAny])
def Get_forecast(request, city):
    auth = env.get("WEATHER_API_KEY")
    endpoint = f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={auth}"
    try:
        response = requests.get(endpoint)
        
        if response.status_code == 200:
            data = response.json()
            print(data)
            return Response({
                'location': data.get('name'),
                'weather': data['weather'][0].get('main'),
                'description': data['weather'][0].get('description'),
                'temperature': data['main'].get('temp'),
                'humidity': data['main'].get('humidity'),
                'wind speed': data['wind'].get('speed'),
            })
        else:
            return Response({'error': 'Failed to fetch forecast'}, status=status.HTTP_400_BAD_REQUEST)

    except requests.exceptions.RequestException as e:
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)