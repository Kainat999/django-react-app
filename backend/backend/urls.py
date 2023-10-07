# project urls.py file code 

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Import necessary modules for Django Channels routing
from channels.routing import ProtocolTypeRouter, URLRouter
from api import consumers # Import your ChatConsumer

# Define the WebSocket URLs
websocket_urlpatterns = [
    path('ws/api/', consumers.ChatConsumer.as_asgi()), # New WebSocket URL
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("api.urls")),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Including the Django Channels router
application = ProtocolTypeRouter({
    "websocket": URLRouter(websocket_urlpatterns)
})
