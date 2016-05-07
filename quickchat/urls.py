"""quickchat URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from chat.views import homepage_handler, message_handler, chat_clear_handler
from userreg.views import *

urlpatterns = [
    url(r'^login/', login_handler),
    url(r'^register/', register_handler),
    url(r'^logout/', logout_handler),

    url(r'^$', homepage_handler),

    url(r'^message/', message_handler),
    url(r'^clear/', chat_clear_handler),
    url(r'^admin/', admin.site.urls),
]
