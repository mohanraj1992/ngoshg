# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from .models import Groups, Loan_Details, Member_Details
from .serializers import GroupsSerializer, LoanDetailsSerializer, MemberDetailsSerializer

from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView, RetrieveDestroyAPIView

# Create your views here.
class GroupsCreateAPIView(CreateAPIView):
    queryset = Groups.objects.all()
    serializer_class = GroupsSerializer

class GroupsListAPIView(ListAPIView):
    queryset = Groups.objects.all()
    serializer_class = GroupsSerializer

class GroupsListGroupAPIView(ListAPIView):
    queryset = Groups.objects.all()
    serializer_class = GroupsSerializer


class LoanDetailsCreateAPIView(CreateAPIView):
    queryset = Loan_Details.objects.all()
    serializer_class = LoanDetailsSerializer

class LoanDetailsListAPIView(ListAPIView):
    queryset = Loan_Details.objects.all()
    serializer_class = LoanDetailsSerializer


class MemberDetailsCreateAPIView(CreateAPIView):
    queryset = Member_Details.objects.all()
    serializer_class = MemberDetailsSerializer


class MemberDetailsListAPIView(ListAPIView):
    queryset = Member_Details.objects.all()
    serializer_class = MemberDetailsSerializer