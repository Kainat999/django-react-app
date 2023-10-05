from django.contrib import admin
from api.models import User, Profile, ChatMessage


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'full_name', 'verified']


class ChatMessageAdmin(admin.ModelAdmin):
    list_editable = ['is_read', 'message']
    list_display = ['sender', 'receiver', 'is_read', 'message']  # Corrected the spelling for 'receiver'

admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(ChatMessage, ChatMessageAdmin)
