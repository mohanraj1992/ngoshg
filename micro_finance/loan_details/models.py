# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Loan_Details(models.Model):
    group_code = models.ForeignKey(Groups, on_delete=models.CASCADE)
    loan_amount = models.IntegerField()
    monthly_emi_loan = models.IntegerField()
    monthly_emi_savings = models.IntegerField()
    interest_rate = models.IntegerField()
    no_of_emi = models.IntegerField()
    loan_ac_num = models.CharField(max_length=100, default='')
    sb_ac_num = models.CharField(max_length=100, default='')