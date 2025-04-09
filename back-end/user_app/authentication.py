#USER_APP.AUTHENTICATION
from rest_framework_simplejwt.authentication import JWTAuthentication

# custom authentication class overrides default JWT Authentication...
# retrieves JWT token from cookes instead of headers
# later imported into settings.py DEFAULT AUTHENTICATION CLASSES
class CookiesJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # retrieve access_token from cookies
        access_token = request.COOKIES.get('access_token')
        if not access_token:
            return None
        
        try:
            # validate token to ensure its valid and hasn't expired
            validated_token = self.get_validated_token(access_token)
            # retreive user from validated token
            user = self.get_user(validated_token)
            # return user and validated token
            return (user, validated_token)
        except:
            return None