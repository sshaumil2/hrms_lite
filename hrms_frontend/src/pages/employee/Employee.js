import { useEffect, useState } from 'react'
import AdminHeader from "../../component/AdminHeader";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints"; 
import DataTable from "../../component/DataTable";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const listEndpoint = ApiEndpoints.employee.List;
const deleteEndpoint = ApiEndpoints.employee.Delete;
const EditPath = "edit-employee";
const tableHeader = ["employee id", "name", "department"];
const tbody = ["employee_id", "name", "department"];

export default function Employee() {
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

    const handleDelete = async (emp_id) => {
      try {
        await ApiRequest("DELETE", deleteEndpoint + emp_id +"/");
        dataFetch();
        toast.success("employee deleted successfully")
      } catch (error) {
        console.log(error);
      }
    };

    const pagename = {
      name: 'Employee Management',
      user: 'Admin',
      innerpage: 'Employee Management / Employee List'
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
          editPath={EditPath}
          onDelete={handleDelete}
        />
      </div>
    </>
  )
}
