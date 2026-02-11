import { useEffect, useState } from 'react'
import AdminHeader from "../../component/AdminHeader";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints"; 
import DataTable from "../../component/DataTable";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const listEndpoint = ApiEndpoints.presentDays.List;
const tableHeader = ["employee id", "name", "department", "Total Attendance"];
const tbody = ["employee_id", "name", "department", "total_present_days"];

export default function PresentDays() {
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
      name: 'Employee Management',
      user: 'Admin',
      innerpage: 'Employee Management / Total Present Days'
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
          showAction={false}
        />
      </div>
    </>
  )
}
