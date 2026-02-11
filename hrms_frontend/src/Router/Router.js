import { Route, Routes } from "react-router-dom";
import AdminLayout from "../Router/AdminLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Employee from "../pages/employee/Employee";
import EmployeeCreate from "../pages/employee/EmployeeCreate";
import EmployeeEdit from "../pages/employee/EmployeeEdit";
import Attendance from "../pages/attendance/Attendance";
import AddAttendance from "../pages/attendance/AddAttendance";
import PresentDays from "../pages/presentDays/PresentDays";
import EmpAttendance from "../pages/empAttendance/EmpAttendance";
import ShowRecords from "../pages/empAttendance/ShowRecords";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="employee" element={<Employee />} />
          <Route path="add-employee" element={<EmployeeCreate />} />
          <Route path="edit-employee/:emp_id" element={<EmployeeEdit />} />

          <Route path="attendance" element={<Attendance />} />
          <Route path="add-attendance" element={<AddAttendance />} />

          <Route path="present-days" element={<PresentDays />} />

          <Route path="emp-attendance" element={<EmpAttendance />} />
          <Route path="emp-attendance/:att_id" element={<ShowRecords />} />
        </Route>
      </Routes>
    </>
  )
}
