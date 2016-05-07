from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.template import RequestContext
from django.contrib.auth import authenticate, login
from django.http import JsonResponse

@csrf_protect
def register_handler(request):
    if request.method == 'POST':
        email = request.POST['email']
        username = request.POST['username']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        if email and username and password1 and password2:
            if password1 == password2:
                user = User.objects.create_user(username=username, email=email, password=password1)
                message = {"success" : True, "msg":"You are successfully registered. Please login"}
            else:
                message = {"success" : False, "msg":"Passwords did not match. Please re-enter"}
        else:
            message = {"success" : False, "msg":"Fields missing"}
        return JsonResponse(message)

@csrf_protect
def login_handler(request):
    if request.method == 'GET':
        return render_to_response('login_signup.html', RequestContext(request))
    elif request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                message = {"success" : True}
            else:
                message = {"success" : False, "msg" : "Your account has been disabled" }
        else:
            message = {"success" : False, "msg" : "Invalid email or password" }
        return JsonResponse(message)

def logout_handler(request):
    logout(request)
    return HttpResponseRedirect('/login')

@login_required
def home(request):
    return render_to_response('home.html',{'user': request.user })