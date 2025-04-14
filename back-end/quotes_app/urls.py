#QUOTES_APP.URLS
from django.urls import path
from .views import Get_random_quote

urlpatterns = [
    path('randomquote/', Get_random_quote, name='randomquote'),
]