#WEATHER_APP.URLS
from django.urls import path
from .views import Get_forecast

urlpatterns = [
    path('<str:city>/forecast/', Get_forecast, name='forecast'),
]