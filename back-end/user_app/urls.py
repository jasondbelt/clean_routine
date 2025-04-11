#USER_APP.URLS
from django.urls import path
from .views import Get_notes, CustomTokenObtainPairView, Log_out, register

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path('notes/', Get_notes, name='getnotes'),
    path('logout/', Log_out, name='logout'),
    path('register/', register, name='register'),
]