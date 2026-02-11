import { useEffect, useState } from 'react'
import AdminHeader from "../../component/AdminHeader";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const updateEndpoint = ApiEndpoints.employee.Update;
export default function EmployeeEdit() {
  const [postData, setPostData] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
  });
  const { emp_id } = useParams();
  const navigate = useNavigate();

  const dataFetch = async () => {
        try {
            const response = await ApiRequest("GET", updateEndpoint + emp_id + "/");
            setPostData(response);
    
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        dataFetch();
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiRequest("PUT", updateEndpoint + emp_id + "/", postData);
      navigate("/employee");
      toast.success("Employee updated successfully!");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const pagename = {
    name: 'Employee Management',
    user: 'Admin',
    innerpage: 'Employee Management / Employees / Edit Employee'
  }

  return (
    <>
      <AdminHeader pagename={pagename} />
      <div className="add-content-page">
        <form id="employeeAdd" onSubmit={handleSubmit}>
          <div className="add-content-wrap">
            <div className="row">

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      Employee Id<small>*</small>
                    </label>
                  </div>
                  <input type="text" name="employee_id" required value={postData.employee_id} onChange={handleChange} className="form-control" />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      Employee Name<small>*</small>
                    </label>
                  </div>
                  <input type="text" name="name" required value={postData.name} onChange={handleChange} className="form-control"/>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      Email<small>*</small>
                    </label>
                  </div>
                  <input type="email" name="email" required value={postData.email} onChange={handleChange} className="form-control"/>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      Department<small>*</small>
                    </label>
                  </div>
                  <input type="text" name="department" required value={postData.department} onChange={handleChange} className="form-control"/>
                </div>
              </div>
            </div>
          </div>
        </form>

        <button type="submit" form="employeeAdd" className="default-btn">
          Publish <span></span>
        </button>
      </div>
    </>
  )
}
