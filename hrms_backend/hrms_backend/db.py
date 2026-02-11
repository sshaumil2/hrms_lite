from mongoengine import connect

connect(
    db="hrms_db",
    host="mongodb://localhost:27017/hrms_db"
)
