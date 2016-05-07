from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

'''
 I am not using this model, as user is not allowed to create create channels for now.
'''
'''
class Channel(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User)
    name = models.CharField(max_length=100)

    def __unicode__(self):
        return self.name
'''

class ChatMessage(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User)
    '''
    #commenting this too, as there are no user created channels, now there is only one public channel.
    channel = models.ForeignKey(Channel)
    '''
    message = models.CharField(max_length=200)

    def __unicode__(self):
        return self.message

'''
    This model will keeps track of chat clearing functionality by user. When ever we fetch users chat history,
    we ll check the last cleared timestamp and fetch the message records accordingly.
'''
class ChatClear(models.Model):
    last_cleared = models.DateTimeField(auto_now=True)
    cleared_by = models.ForeignKey(User)