import {useEffect, useState } from "react";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints";
import DataTable from "../../component/DataTable";
import AdminHeader from "../../component/AdminHeader";

const contactListEndpoint = ApiEndpoints.contact.contactList;

const tableHeader = ["Date","Name", "phone", "email","City", "message", "Source Url", "Page Url"];
const tbody = ["createdAt","name", "phone", "email", "city",  "message", "source_url", "current_url"];

export default function Contact() {
    const [data, setData] = useState([]);

    const dataFetch = async () => {
        try {
            const response = await ApiRequest("GET", contactListEndpoint);
            const result = response.contacts;
            setData(result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        dataFetch();
    }, []);

    const pagename = {
      name: 'Contact Us',
      user: 'Admin',
      innerpage: 'Contact Us'
    }

  const contactUsData = data?.filter((item)=> item.form_type === "contact_form");

  return (
    <>
    <AdminHeader pagename={pagename}/>

    <div className="add-btn-section contact-manage-tab">
        <DataTable
          data={contactUsData}
          tableHeader={tableHeader}
          tbody={tbody}
          showAction={false}
        />
    </div>
    </>
  )
}
