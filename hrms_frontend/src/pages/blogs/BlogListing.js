import { useEffect, useState } from "react";
import DataTable from "../../component/DataTable";
import { Link } from "react-router-dom";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints"; 
import { toast } from "react-toastify";
import AdminHeader from "../../component/AdminHeader";

const blogDeleteEndpoint = ApiEndpoints.adminBlogs.blogDelete;
const blogListEndpoint = ApiEndpoints.adminBlogs.blogList;
const blogEditPath = "edit-blog";
const tableHeader = ["Date","Title","Slug"];
const tbody = ["date","title","slug"];

export default function BlogListingAdmin() {

  const [data, setData] = useState([]);

  const dataFetch = async () => {
    try {
      const response = await ApiRequest("GET", blogListEndpoint);
      const result = response.blogs;
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { 
    dataFetch();
  }, []);

  const handleDelete = async (blog_id) => {
      const payload = { blog_id };
      try {
        const response = await ApiRequest("POST", blogDeleteEndpoint, payload);
        toast.success(response.message)
        dataFetch();
      } catch (error) {
        console.error(error);
      }
    };

    const pagename = {
      name: 'Blog Management',
      user: 'Admin',
      innerpage: 'Blog Management / Blog'
    }

  return (
    <>
    <AdminHeader pagename={pagename}/>

      <div className="add-btn-section">
        <Link className="admin-add-btn" to="/add-blog">Add +</Link>
        <DataTable
          data={data}
          tableHeader={tableHeader}
          tbody={tbody}
          editPath={blogEditPath}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}
