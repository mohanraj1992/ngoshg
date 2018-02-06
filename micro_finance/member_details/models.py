# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Member_Details(models.Model):
    group_code = models.ForeignKey(Groups, on_delete=models.CASCADE)
    id = models.CharField(max_length=100, default='') #todo This has to be auto generated
    name = models.CharField(max_length=100, default='')
    mobile = models.CharField(max_length=100, default='')
    aadhar_id = models.CharField(max_length=16, default='')
    account_number  = models.CharField(max_length=100, default='')
    ins_scheme = models.CharField(max_length=100, default='')
    ins_amount = models.IntegerField()
    ins_policy_num = models.CharField(max_length=100, default='')