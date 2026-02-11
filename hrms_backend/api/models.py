from mongoengine import Document, StringField, EmailField, ReferenceField, DateField


class Employee(Document):
    employee_id = StringField(required=True, unique=True)
    name = StringField(required=True, max_length=100)   
    email = EmailField(required=True, unique=True)
    department = StringField(required=True, max_length=100)

    meta = {'collection': 'employees'}

    def __str__(self):
        return self.name


class Attendance(Document):
    employee = ReferenceField(Employee, required=True)
    date = DateField(required=True)
    status = StringField(choices=['P', 'A'], required=True)

    meta = {
        'collection': 'attendance',
        'indexes': [
            {'fields': ['employee', 'date'], 'unique': True}
        ]
    }
