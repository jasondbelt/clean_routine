#QUOTES_APP.URLS
from django.urls import path
from .views import Get_forecast

urlpatterns = [
    path('forecast/', Get_forecast, name='forecast'),
]