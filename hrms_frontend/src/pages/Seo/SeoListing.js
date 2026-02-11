import { useEffect, useState } from 'react'
import AdminHeader from "../../component/AdminHeader";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints"; 
import DataTable from "../../component/DataTable";
import { Link } from 'react-router-dom';

const seoListEndpoint = ApiEndpoints.seo.seoList;
const seoDeleteEndpoint = ApiEndpoints.seo.seoDelete;
const seoEditPath = "edit-seo";
const tableHeader = ["Url", "Title", "Description"];
const tbody = ["url", "title", "description"];

export default function SeoListing() {
    const [data, setData] = useState([]);
  
    const dataFetch = async () => {
        try {
            const response = await ApiRequest("GET", seoListEndpoint);
            const result = response.seos;
            setData(result);
    
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        dataFetch();
    }, []);

    const handleDelete = async (seo_id) => {
      const payload = { seo_id };
      try {
        await ApiRequest("POST", seoDeleteEndpoint, payload);
        dataFetch();
      } catch (error) {
        console.log(error);
      }
    };

    const pagename = {
      name: 'SEO Management',
      user: 'Admin',
      innerpage: 'SEO Management / SEO'
    }

  return (
    <>
     <AdminHeader pagename={pagename}/> 

     <div className="add-btn-section">
        <Link className="admin-add-btn" to="/add-seo">Add +</Link>
        <DataTable
          data={data}
          tableHeader={tableHeader}
          tbody={tbody}
          editPath={seoEditPath}
          onDelete={handleDelete}
        />
      </div>
    </>
  )
}
