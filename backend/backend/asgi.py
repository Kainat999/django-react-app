"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path

# Set the Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Get the ASGI app from Django
django_asgi_app = get_asgi_application()

# Avoid circular imports; make sure to import consumers after setting the settings.
from api import consumers  

websocket_urlpatterns = [
    path('ws/api/', consumers.ChatConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    "http": django_asgi_app,  
    "websocket": AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})
