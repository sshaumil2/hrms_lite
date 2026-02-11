import { useState } from 'react'
import AdminHeader from "../../component/AdminHeader";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const createEndpoint = ApiEndpoints.employee.Create;
export default function EmployeeCreate() {
  const [postData, setPostData] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
  });

  const navigate = useNavigate();

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
      await ApiRequest("POST", createEndpoint, postData);
      navigate("/employee");
      toast.success("Employee created successfully!");
    } catch (error) {
      toast.error("Employee ID is Already in Use")
      console.error("Error creating employee:", error);
    }
  };

  const pagename = {
    name: 'Employee Management',
    user: 'Admin',
    innerpage: 'Employee Management / Employees / Add Employee'
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
