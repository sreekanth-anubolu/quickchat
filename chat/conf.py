from django.conf import settings


CHAT_ROUTER = getattr(settings, 'ROUTER', 'chat.message_router.MessageRouter')
CHAT_ENGINE = getattr(settings, 'ENGINE', 'chat.engine')
