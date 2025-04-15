#WEATHER_APP.URLS
from django.urls import path
from .views import Get_forecast

urlpatterns = [
    path('forecast/<str:city>/', Get_forecast, name='forecast'),
]