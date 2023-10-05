import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
from .models import ChatMessage, User

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope["user"].id
        self.room_group_name = f'chat_{self.user_id}'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
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
            reciever=receiver
        )
        return message_obj

    async def receive(self, text_data):
        data = json.loads(text_data)
        message_content = data['message']
        sender_id = data['sender_id']
        receiver_id = data['receiver_id']

        # Create a new message object and save it to the database
        message_obj = await self.create_message(message_content, sender_id, receiver_id)

        # Send the message to the group (in this case, just to the receiver)
        await self.channel_layer.group_send(
            f'chat_{receiver_id}',
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

        # Send the message to the websocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender_id': sender_id,
            'receiver_id': receiver_id,
            'timestamp': timestamp
        }))
