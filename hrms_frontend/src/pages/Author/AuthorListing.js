import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../../component/AdminHeader";
import ApiRequest from "../../helper/ApiRequest";
import DataTable from "../../component/DataTable";
import { ApiEndpoints } from "../../helper/ApiEndpoints";
import { toast } from "react-toastify";
import AddAuthor from "./AddAuthor";
import EditAuthor from "./EditAuthor";

const authorListEndpoint = ApiEndpoints.autor.authorList;
const authorDeleteEndpoint = ApiEndpoints.autor.authorDelete;
const tableHeader = ["Date","Name", "Status"];
const tbody = ["createdAt","name", "status"];

const dataFetch = async (setData) => {
  try {
    const response = await ApiRequest("GET", authorListEndpoint);
    const result = response.authors;
    setData(result);
  } catch (error) {
    console.log(error);
  }
};

export default function AuthorListing() {
  const [data, setData] = useState([]);
  const [authId, setAuthId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modaleditShow, setModalEditShow] = useState(false);

  useEffect(() => {
    dataFetch(setData);
  }, []);

  const handleDelete = async (author_id) => {
    const payload = { author_id };
    try {
      const response = await ApiRequest("POST", authorDeleteEndpoint, payload);
      toast.success(response.message);
      dataFetch();
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  const pagename = {
    name: 'Blog Management',
    user: 'Admin',
    innerpage: 'Blog Management / author'
  }

  return (
    <>
    <AdminHeader pagename={pagename}/>
  
    <div className="add-btn-section">
      <Link className="admin-add-btn" onClick={() => setModalShow(true)}>Add +</Link>
      <DataTable
        data={data}
        tableHeader={tableHeader}
        tbody={tbody}
        setModalShow={setModalEditShow}
        setId = {setAuthId}
        // onDelete={handleDelete}
      />
    </div>

    <AddAuthor show={modalShow} onHide={() => setModalShow(false)}/>
    <EditAuthor show={modaleditShow} authId ={authId} onHide={() => setModalEditShow(false)}/>
    </>
  )
}
