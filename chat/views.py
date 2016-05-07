from django.shortcuts import render
from django.http import JsonResponse
from django.utils import timezone
import json

from chat.models import ChatMessage, ChatClear #, Channel,
from utils.custom_wrappers import is_authenticated
from db import raw_query as db

@is_authenticated
def homepage_handler(request):
    return render(request, 'base.html', {})

@is_authenticated
def message_handler(request):

    if request.method == "POST":
        #add new message
        json_data = json.loads(request.body)
        message = json_data.get('message')
        if message:
            msg = ChatMessage(created_by=request.user,  message=message)
            msg.save()
            return JsonResponse({'success': True, 'message': 'ok'})

    if request.method == "GET":
        #return messages of public channel limit by 100
        offset = request.GET.get('offset')
        if not offset:
            offset = 0
            raw_sql = "SELECT cm.message, cm.created_on,au.username FROM quickchat.chat_chatmessage cm inner join " \
                      "quickchat.auth_user au on  cm.created_by_id = au.id where created_on > " \
                      "(select last_cleared FROM quickchat.chat_chatclear where cleared_by_id="+str(request.user.id)+") order by " \
                      "created_on limit 100 offset "+str(offset)+";"
            chat_messages = db.get_all_messages(raw_sql)
        return JsonResponse({'success':True, 'data' : chat_messages})

'''
@is_authenticated
def channel_handler(request):

    if request.method == "POST":
        #create channel
        json_data = json.loads(request.body)
        name = json_data.get('name')
        if name:
            channel = Channel(name=name, created_by=request.user)
            channel.save()
            return JsonResponse({'success' : True, 'data' : 'Channel '+name+' created successfully'})

    if request.method == "GET":
        #return all the channels
        channels = Channel.objects.all()
        data = {'success' : True, 'data' : channels}
        return JsonResponse(data)
'''

@is_authenticated
def chat_clear_handler(request):
    if request.method == "PUT":
        p, created = ChatClear.objects.update_or_create(cleared_by=request.user, defaults={'last_cleared': timezone.now()})
        #p.save()
        return JsonResponse({'success' : True})



