import { useState } from "react";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints";
import CustomSelect from "../../component/CustomSelect";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Icons from "../../myIcon/Icons";

const addCategoryEndPoints = ApiEndpoints.category.categoryCreate;

export default function AddCategory({ show, onHide }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const StatusData = [{ _id: "1", name: "Disable" }, { _id: "0", name: "Enable" }];

  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleChange = (e) => setName(e.target.value);

  const handleSubmit =  async (event) => {
      event.preventDefault();
      if (!name || !status) {
        toast.error("All fields are required.");
        return;
      }
      const payload = { name, status};
      try {
        const response = await ApiRequest("POST", addCategoryEndPoints, payload);
        toast.success(response.message);
        onHide();
      } catch (error) {
        console.error("There was an error creating the author!", error);
      }
    };

  return (
    <>
      <Modal className="add-modal-area" show={show} onHide={onHide} size="sm" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Body>
          <button className="modal-close-button" onClick={onHide}><Icons name="cross"/></button>
          <form onSubmit={handleSubmit}>
            <div className="add-page-inputs">
              <div className="col-lg-12">
                <div className="add-page-sections">Create Category</div>
              </div>
              <div className="label-wrap-add">
                <label>add category<small>*</small></label>
              </div>
              <input type="text" value={name} onChange={handleChange} required className="form-control" placeholder="Enter Here" />
            </div>

            <div className="add-page-inputs">
              <div className="label-wrap-add">
                <label>Status<small>*</small></label>
              </div>
              <CustomSelect options={StatusData} placeholder="Select Status" onChange={handleStatusChange} />
            </div>

            <button type="submit" className="default-btn">add<span></span></button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
