# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import datetime


# Create your models here.

class Groups(models.Model):
    group_name = models.CharField(max_length=100, default='')
    group_code = models.CharField(max_length=100, default='') #This has to be generated automatically
    loan_purpose  = models.CharField(max_length=100, default = '')
    no_of_members = models.IntegerField()
    loan_cycle = models.IntegerField()
    previous_loan_amount = models.IntegerField()
    previous_loan_closure_date = models.DateField(default=datetime.date.today)
    village = models.CharField(max_length=100, default='')
    panchayat = models.CharField(max_length=100, default='')
    block = models.CharField(max_length=100, default='')
    bank = models.CharField(max_length=100, default='')
    branch = models.CharField(max_length=100, default='')
    loan_sanctioned_date = models.DateField(default=datetime.date.today)
    photo_form = models.FileField(null=True, blank=True, upload_to='group_forms/')


class Loan_Details(models.Model):
    group_code = models.ForeignKey(Groups, on_delete=models.CASCADE)
    loan_amount = models.IntegerField()
    monthly_emi_loan = models.IntegerField()
    monthly_emi_savings = models.IntegerField()
    interest_rate = models.IntegerField()
    no_of_emi = models.IntegerField()
    loan_ac_num = models.CharField(max_length=100, default='')
    sb_ac_num = models.CharField(max_length=100, default='')


class Member_Details(models.Model):
    group_code = models.ForeignKey(Groups, on_delete=models.CASCADE)
    member_id = models.CharField(max_length=100, default='') #todo This has to be auto generated
    name = models.CharField(max_length=100, default='')
    mobile = models.CharField(max_length=100, default='')
    aadhar_id = models.CharField(max_length=16, default='')
    account_number  = models.CharField(max_length=100, default='')
    ins_scheme = models.CharField(max_length=100, default='')
    ins_amount = models.IntegerField()
    ins_policy_num = models.CharField(max_length=100, default='')


