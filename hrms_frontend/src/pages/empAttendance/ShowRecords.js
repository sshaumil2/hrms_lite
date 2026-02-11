import { useEffect, useState } from 'react'
import AdminHeader from "../../component/AdminHeader";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints"; 
import DataTable from "../../component/DataTable";
import { Link, useParams } from 'react-router-dom';

const listEndpoint = ApiEndpoints.attendance.EmpAttendance;
const tableHeader = [ "name", "date", "Attendance"];
const tbody = [ "employee", "date", "status"];

export default function ShowRecords() {
    const [data, setData] = useState([]);
    const {att_id} = useParams();
  
    const dataFetch = async () => {
        try {
            const response = await ApiRequest("GET", listEndpoint + att_id + "/");
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
      innerpage: 'Attendance Management / Individual Employee Attendance Records'
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
          showAction= {false}
        />
      </div>
    </>
  )
}
