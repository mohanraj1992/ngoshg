from rest_framework import serializers

from .models import Groups, Loan_Details, Member_Details


class GroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groups
        fields = ("__all__")

class LoanDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan_Details
        fields = ("__all__")

class MemberDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member_Details
        fields = ("__all__")