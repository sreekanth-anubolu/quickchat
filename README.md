# quickchat
Django based realtime channel chat (Django, MySQL, Angularjs)

Framework
  - Backend
    - Django
    - MySql
  
  - Frontend
    - Angularjs
    - Bootstrap
    
System requirements(Dev Env):
  - Python version : 2.7
  - OS : Ubuntu
  - Database : MySQl
  
Run Quickchat:
  - Clone the project
  - Create Virtual env and activate it
  - Install requirements
    - pip install -r requirements.txt
  - Run recrate_db.sh
    - tools/recreate_db.sh
    - database - quickchat, user - quickchatuser, password - quickchat
  
  - Run tools/migrate.sh

Thats it, all set go to 127.0.0.1:8000 to see app in action.

Real time channel chat:
  Channels(https://github.com/andrewgodwin/channels) is an exciting upcoming feature of Django, it allows Django apps to implement realtime communication using websockets.

Reference:
  - http://channels.readthedocs.io/en/latest/
  - http://www.machinalis.com/blog/introduction-to-django-channels/
  - https://www.aeracode.org/2016/1/3/laying-channels-groundwork/
  
  
    
