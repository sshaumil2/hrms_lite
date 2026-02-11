from django.urls import path
from .views import (
    dashboard_summary,
    employee_attendance,
    employee_create,
    employee_delete,
    employee_list,
    employee_update,
    mark_attendance,
    present_days_per_employee
)

urlpatterns = [
    path('employees/', employee_list),
    path('employees/create/', employee_create),
    path('employees/update/<str:pk>/', employee_update),
    path('employees/delete/<str:pk>/', employee_delete),

    path('attendance/', mark_attendance),
    path('attendance/<str:emp_id>/', employee_attendance),

    path('dashboard/', dashboard_summary),

    path('employees-present-days/', present_days_per_employee)
]
