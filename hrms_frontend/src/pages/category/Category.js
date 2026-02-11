import {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints";
import DataTable from "../../component/DataTable";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import { toast } from "react-toastify";
import AdminHeader from "../../component/AdminHeader";

const categoryListEndpoint = ApiEndpoints.category.categoryList;
const categoryDeleteEndpoint = ApiEndpoints.category.categoryDelete;
const tableHeader = ["Date","Name", "status"];
const tbody = ["createdAt","name", "status"];

export default function Category() {
  const [catId, setCatId] = useState("");
  const [modaleditShow, setModalEditShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);

  const dataFetch = async () => {
      try {
        const response = await ApiRequest("GET", categoryListEndpoint);
        const result = response.blog_categories;
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    dataFetch();
  }, []);

  const handleDelete = async (blogcategory_id) => {
      const payload = { blogcategory_id };
      try {
        const response = await ApiRequest("POST", categoryDeleteEndpoint, payload);
        toast.success(response.message);
        dataFetch();
      } catch (error) {
        console.log(error);
      }
    };

    const pagename = {
      name: 'Blog Management',
      user: 'Admin',
      innerpage: 'Blog Management / Category'
    }

  return (
    <>
    <AdminHeader pagename={pagename}/>

      <div className="add-btn-section">
        <Link className="admin-add-btn" onClick={() => setModalShow(true)}> Add +</Link>
        <DataTable
          data={data}
          tableHeader={tableHeader}
          tbody={tbody}
          setModalShow={setModalEditShow}
          setId={setCatId}
          // onDelete={handleDelete}
        />
      </div>
      <AddCategory show={modalShow} onHide={() => setModalShow(false)} />
      <EditCategory show={modaleditShow} catId={catId} onHide={() => setModalEditShow(false)} />
    </>
  );
}
