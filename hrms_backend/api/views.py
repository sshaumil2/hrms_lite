from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from mongoengine.errors import DoesNotExist
from .models import Employee, Attendance
from .serializer import EmployeeSerializer, AttendanceSerializer
from datetime import date


# for employee api

@api_view(['GET'])
def employee_list(request):
    employees = Employee.objects()   # MongoEngine
    serializer = EmployeeSerializer(employees, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def employee_create(request):
    serializer = EmployeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT'])
def employee_update(request, pk):
    try:
        employee = Employee.objects.get(id=pk)   # Mongo uses id, not pk
    except DoesNotExist:
        return Response({"error": "Employee not found"}, status=404)

    if request.method == 'GET':
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = EmployeeSerializer(employee, data=request.data)
        if serializer.is_valid():
            employee.update(**serializer.validated_data)
            employee.reload()
            return Response(EmployeeSerializer(employee).data)
        return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def employee_delete(request, pk):
    try:
        employee = Employee.objects.get(id=pk)
    except DoesNotExist:
        return Response({"error": "Employee not found"}, status=404)

    employee.delete()
    return Response({"message": "Employee deleted"}, status=204)


# for attendance api

@api_view(['POST'])
def mark_attendance(request):
    serializer = AttendanceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def employee_attendance(request, emp_id):
    try:
        emp = Employee.objects.get(id=emp_id)
    except DoesNotExist:
        return Response({"error": "Employee not found"}, status=404)

    records = Attendance.objects(employee=emp)

    date = request.GET.get('date')
    if date:
        records = records.filter(date=date)

    serializer = AttendanceSerializer(records, many=True)
    return Response(serializer.data)


# for dashboard api

@api_view(['GET'])
def dashboard_summary(request):
    today = date.today()

    total_employees = Employee.objects.count()

    present_today = Attendance.objects(
        date=today,
        status='P'
    ).count()

    absent_today = Attendance.objects(
        date=today,
        status='A'
    ).count()

    not_marked_today = total_employees - (present_today + absent_today)

    if not_marked_today < 0:
        not_marked_today = 0

    return Response({
        "total_employees": total_employees,
        "present_today": present_today,
        "absent_today": absent_today,
        "not_marked_today": not_marked_today
    })


# for total present every employee api

@api_view(['GET'])
def present_days_per_employee(request):
    employees = Employee.objects.all()

    data = []

    for emp in employees:
        present_count = Attendance.objects.filter(
            employee=emp,
            status='P'
        ).count()

        data.append({
            "employee_id": emp.employee_id,
            "name": emp.name,
            "department": emp.department,
            "total_present_days": present_count
        })

    return Response(data)