# -*- coding: utf-8 -*-
from __future__ import unicode_literals

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