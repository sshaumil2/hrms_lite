import { useState, useEffect} from "react";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints";
import CustomSelect from "../../component/CustomSelect";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Icons from "../../myIcon/Icons";

const categoryEditEndpoint = ApiEndpoints.category.categoryEdit;
const categoryUpdateEndPoint = ApiEndpoints.category.categoryUpdate;

export default function EditCategory({ show, onHide, catId }) {
  const category_id = catId;
  const [data, setData] = useState({ name: "" , status: "" });
  const StatusData = [{ _id: "1", name: "Disable" }, { _id: "0", name: "Enable" }];

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await ApiRequest("GET", `${categoryEditEndpoint}${category_id}`);
        const result = response.blogcategory;
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };
    dataFetch();
  }, [category_id]);

  const handleInputChange =  (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

  const handleSubmit = async (event) => {
      event.preventDefault();
      if (!data.name || !data.status) {
        toast.error("All fields are required.");
        return;
      }
      const payload = { blogcategory_id: category_id, name: data.name, status: data.status,};
      try {
        const response = await ApiRequest("POST",categoryUpdateEndPoint, payload);
        toast.success(response.message);
        onHide();
      } catch (error) {
        console.log(error);
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
                <div className="add-page-sections">Edit Category</div>
              </div>
              <div className="label-wrap-add">
                <label>Edit Category<small>*</small></label>
              </div>
              <input required name="name" value={data.name} type="text" className="form-control" onChange={handleInputChange} />
            </div>

            <div className="add-page-inputs">
              <div className="label-wrap-add">
                <label>Status<small>*</small></label>
              </div>
              <CustomSelect name="status" defaultValue={data.status} options={StatusData} placeholder="Select Status" onChange={handleInputChange} />
            </div>

            <button type="submit" className="default-btn">
              Save Changes
              <span></span>
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
