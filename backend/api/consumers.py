import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
from .models import ChatMessage, User

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Extract the sender_id and receiver_id from the URL.
        self.sender_id = self.scope['url_route']['kwargs']['sender_id']
        self.receiver_id = self.scope['url_route']['kwargs']['receiver_id']

        # Form the room_group_name using both IDs.
        self.room_group_name = f'chat_{self.sender_id}_{self.receiver_id}'

        # If the authenticated user matches either the sender or receiver, proceed to connect.
        if self.scope["user"].is_authenticated and (self.scope["user"].id == int(self.sender_id) or self.scope["user"].id == int(self.receiver_id)):
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()
        else:
            await self.close()

    async def disconnect(self, close_code):
        if hasattr(self, 'room_group_name'):
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

    @database_sync_to_async
    def create_message(self, message_content, sender_id, receiver_id):
        sender = User.objects.get(id=sender_id)
        receiver = User.objects.get(id=receiver_id)
        message_obj = ChatMessage.objects.create(
            message=message_content,
            sender=sender,
            receiver=receiver
        )
        return message_obj

    async def receive(self, text_data):
        data = json.loads(text_data)
        message_content = data['message']
        sender_id = data['sender_id']
        receiver_id = data['receiver_id']

        message_obj = await self.create_message(message_content, sender_id, receiver_id)

        # Send the message to both the sender's and receiver's group.
        for user_id in [sender_id, receiver_id]:
            await self.channel_layer.group_send(
                f'chat_{sender_id}_{user_id}',
                {
                    'type': 'chat_message',
                    'message': message_obj.message,
                    'sender_id': sender_id,
                    'receiver_id': receiver_id,
                    'timestamp': str(message_obj.date)
                }
            )

    async def chat_message(self, event):
        message = event['message']
        sender_id = event['sender_id']
        receiver_id = event['receiver_id']
        timestamp = event['timestamp']

        await self.send(text_data=json.dumps({
            'message': message,
            'sender_id': sender_id,
            'receiver_id': receiver_id,
            'timestamp': timestamp
        }))
