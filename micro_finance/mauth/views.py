from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as userlogin, logout as userlogout
import logging

# Debug logger
logger = logging.getLogger('debug.logger')

@login_required
def index(request):
    return redirect("/")


def login(request):
    next = request.GET.get('next')
    logger.debug("Next in GET: %s" % next)
    if next is None and request.POST.get('next') is not None:
        next = request.POST.get('next')
        logger.debug("Next in POST: %s" % next)
    if next is None:
        next = "/"
    #next = next.replace('#', '%23')

    if request.method == "POST":
        # try:
        username = request.POST.get('username')
        password = request.POST.get('password')
        #logger.debug("Authenticating user [%s]" % username)
        user = authenticate(username=username, password=password)

        if user is not None and not user.removed:
            userlogin(request, user)
            # log_event(user=user, tenant=user.tenant, event_code="WMSUSER_LOGIN")
            return redirect(next)
        else:
            return render(request, 'login.html', {'error': 'fail', 'next': next})
        # except KeyError:
        #     return render(request, 'login.html', {'next': next})
    else:
        return render(request, 'login.html', {'next': next})


@login_required
def logout(request):
    # log_event(user=request.user, tenant=request.user.tenant, event_code="WMSUSER_LOGOUT")
    userlogout(request)
    return redirect("/auth/login")
    #return render(request, 'login.html', {'error': ''})



