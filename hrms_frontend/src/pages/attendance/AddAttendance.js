import { useEffect, useState } from 'react'
import AdminHeader from "../../component/AdminHeader";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import CustomSelect from '../../component/CustomSelect';

const createEndpoint = ApiEndpoints.attendance.Create;
const listEndpoint = ApiEndpoints.employee.List;
export default function AddAttendance() {
  const [postData, setPostData] = useState({
    employee: "",
    date: "",
    status: "",
  });
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  const dataFetch = async () => {
        try {
            const response = await ApiRequest("GET", listEndpoint);
            setEmployees(response);
    
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
      await ApiRequest("POST", createEndpoint, postData);
      navigate("/attendance");
      toast.success("Attendance added successfully!");
    } catch (error) {
      toast.error("Already added for this date");
      console.error("Error adding attendance:", error);
    }
  };

  const pagename = {
    name: 'Attendance Management',
    user: 'Admin',
    innerpage: 'Attendance Management / Attendance / Add Attendance'
  }

  const statusData = [
    { id: "P", name: "Present" },
    { id: "A", name: "Absent" },
  ];
  console.log(postData)

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
                      Employee<small>*</small>
                    </label>
                  </div>
                  <CustomSelect name={"employee"} options={employees} required defaultValue={postData.employee} onChange={handleChange} className="form-control" placeholder='Choose Employee'/>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      Date<small>*</small>
                    </label>
                  </div>
                  <input type="date" name="date" required value={postData.date} onChange={handleChange} className="form-control" />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      Status<small>*</small>
                    </label>
                  </div>
                  <CustomSelect name={"status"} options={statusData} required defaultValue={postData.status} onChange={handleChange} className="form-control" placeholder='Choose Status'/>
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
