
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from channels.routing import ProtocolTypeRouter, URLRouter
from api import consumers

websocket_urlpatterns = [
    path('ws/api/', consumers.ChatConsumer.as_asgi()), # New WebSocket URL
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("api.urls")),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

application = ProtocolTypeRouter({
    "websocket": URLRouter(websocket_urlpatterns)
})
