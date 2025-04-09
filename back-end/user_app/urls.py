#USER_APP.URLS
from django.urls import path, include
from .views import Get_notes, CustomTokenObtainPairView, CustomRefreshTokenView, Log_out, Is_authenticated, register

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path('token/refresh/', CustomRefreshTokenView.as_view(), name='custom_token_refresh'),
    path('notes/', Get_notes, name='getnotes'),
    path('logout/', Log_out, name='logout'),
    path('authenticated/', Is_authenticated, name='authenticated'),
    path('register/', register, name='register'),
]