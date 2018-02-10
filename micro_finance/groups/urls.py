from django.conf.urls import url
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
    # url(r'^create/$', achievements_list, name='achievements_list'),
    url(r'^create/$', GroupsCreateAPIView.as_view(), name='groups_create'),
    url(r'^$', GroupsListAPIView.as_view(), name='groups_list'),
    url(r'^(?P<pk>\d+)/$', GroupsDetailAPIView.as_view(), name='group_id'),
    url(r'^loandetails/create/$', LoanDetailsCreateAPIView.as_view(), name='groups_create'),
    url(r'^loandetails/$', LoanDetailsListAPIView.as_view(), name='groups_list'),
    url(r'^memberdetails/create/$', MemberDetailsCreateAPIView.as_view(), name='groups_create'),
    url(r'^memberdetails/$', MemberDetailsListAPIView.as_view(), name='groups_list'),
     # url(r'^(?P<group_code>[\w-]+)/$', FinanceGetAthleteAPIView.as_view(), name='finance_details'),
     # url(r'^(?P<group_code>[\w-]+)/(?P<pk>\d+)/$', FinanceDetailAPIView.as_view(), name='finance_details_id'),
     # url(r'^(?P<group_code>[\w-]+)/(?P<pk>\d+)/edit$', FinanceUpdateAPIView.as_view(), name='finance_edit'),
     # url(r'^(?P<group_code>[\w-]+)/(?P<pk>\d+)/delete$', FinanceDeleteAPIView.as_view(), name='finance_delete'),
]
urlpatterns += router.urls