from rest_framework import serializers
from .models import Employee, Attendance


class EmployeeSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    employee_id = serializers.CharField()
    name = serializers.CharField()   
    email = serializers.EmailField()
    department = serializers.CharField()

    def create(self, validated_data):
        return Employee(**validated_data).save()


class AttendanceSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    employee = serializers.CharField() # we will take _id value
    date = serializers.DateField()
    status = serializers.CharField()

    def create(self, validated_data):
        emp = Employee.objects.get(id=validated_data['employee'])
        return Attendance(
            employee=emp,
            date=validated_data['date'],
            status=validated_data['status']
        ).save()
