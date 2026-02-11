import { useEffect, useState } from 'react'
import AdminHeader from "../../component/AdminHeader";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints"; 
import DataTable from "../../component/DataTable";
import { Link } from 'react-router-dom';

const listEndpoint = ApiEndpoints.employee.List;
const tableHeader = ["employee id", "name", "department"];
const tbody = ["employee_id", "name", "department"];

export default function EmpAttendance() {
    const [data, setData] = useState([]);
  
    const dataFetch = async () => {
        try {
            const response = await ApiRequest("GET", listEndpoint);
            setData(response);
    
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        dataFetch();
    }, []);

    const pagename = {
      name: 'Attendance Management',
      user: 'Admin',
      innerpage: 'Attendance Management / Individual Employee Attendance'
    }

  return (
    <>
     <AdminHeader pagename={pagename}/> 

     <div className="add-btn-section">
        <Link className="admin-add-btn" to="/add-employee">Add +</Link>
        <DataTable
          data={data}
          tableHeader={tableHeader}
          tbody={tbody}
          editPath={"emp-attendance"}
          showRecord = {true}
          showAction= {false}
        />
      </div>
    </>
  )
}
