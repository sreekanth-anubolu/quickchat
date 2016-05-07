from django.http import HttpResponseRedirect

'''
    This wrapper is to check if user is authenticated, if not it will redirect user to login page
'''
def is_authenticated(function):
    def wrapper(request, *args, **kw):
        if request.user.is_authenticated():
            return function(request, *args, **kw)
        else:
            return HttpResponseRedirect('/login/')
    return wrapper