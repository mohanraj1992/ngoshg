from django.db import models
from django.contrib.sessions.backends.db import SessionStore as DBStore
from django.contrib.sessions.base_session import AbstractBaseSession
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import AbstractUser, Group
from django.utils import timezone
from django.utils.timezone import utc
import datetime

import logging

# Debug logger
logger = logging.getLogger('debug.logger')


# http://scottbarnham.com/blog/2008/08/21/extending-the-django-user-model-with-inheritance/
class SystemUser(AbstractUser):
    removed = models.BooleanField(default=False)                        # If true, this account has been marked as removed (deleted)
    timezone = models.CharField(max_length=100, null=True)              # If null, it'll use UTC time
    reset_password = models.BooleanField(default=True)                  # Must reset their password?
    password_reset_date = models.DateTimeField(null=True)               # Date the password was last reset

    def json_ready(self, detailed=False):
        data = {'id': self.id,
                'username': self.username,
                'first_name': self.first_name,
                'last_name': self.last_name,
                'last_login': str(self.last_login).replace("T", ' '),
                'staff': True if self.is_staff else False,              # If the user is staff, return True
                'superuser': True if self.is_superuser else False,      # If the user is a super user, return True
                'enabled': True if self.is_active else False,           # If the user is enabled or not
                'email': self.email,
                'timezone': self.timezone if self.timezone and self.timezone != "" else "UTC",
                'reset_password': self.reset_password,
                'password_reset_date': str(self.password_reset_date).replace("T", " ") if self.password_reset_date else None,
                }

        if detailed:
            pass

        return data

    @property
    def full_name(self):
        return "%s %s" % (self.first_name, self.last_name)


class SystemUserSession(AbstractBaseSession):
    user_id = models.IntegerField(null=True, db_index=True)
    created = models.DateTimeField(auto_now_add=True, null=False)
    modified = models.DateTimeField(auto_now=True)

    @classmethod
    def get_session_store_class(cls):
        return SessionStore

    def json_ready(self, detailed=False):
        return {'session_key': self.session_key,
                'user_id': self.user_id if self.user_id else None,
                'created': str(self.created).replace('T', ' ').split('+', 1)[0],
                'modified': str(self.modified).replace('T', ' ').split('+', 1)[0],
                'expire_date': str(self.expire_date).replace('T', ' ').split('+', 1)[0],
                'expired': self.expired
                }
        #
        if detailed:
            pass

    class Meta:
        ordering = ['-expire_date']

    @property
    def expired(self):
        now = timezone.now()
        timediff = self.expire_date - now
        if timediff.total_seconds() < 0:
            return True
        else:
            return False





class SessionStore(DBStore):
    @classmethod
    def get_model_class(cls):
        return SystemUserSession

    def create_model_instance(self, data):
        obj = super(SessionStore, self).create_model_instance(data)
        try:
            user_id = int(data.get('_auth_user_id'))
        except (ValueError, TypeError):
            user_id = None

        obj.user_id = user_id
        return obj

