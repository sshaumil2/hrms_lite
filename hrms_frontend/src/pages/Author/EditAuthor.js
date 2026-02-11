import { useState, useEffect } from "react";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints";
import CustomSelect from "../../component/CustomSelect";
import CustomImageUpload from "../../component/CustomImageUpload";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Icons from "../../myIcon/Icons";
import { BaseUrl } from "../../helper/BaseUrl";

const authorEditEndpoint = ApiEndpoints.autor.authorEdit;
const authorUpdateEndPoint = ApiEndpoints.autor.authorUpdate;

export default function EditAuthor({ show, onHide, authId }) {
  const author_id = authId;
  const [data, setData] = useState({ name: "", designation: "", image: null, });
  const [previews, setPreviews] = useState(null);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await ApiRequest(
          "GET",
          `${authorEditEndpoint}${author_id}`
        );
        const result = response.author;
        setData(result);
        setPreviews(`${BaseUrl}/${result.image}`);
      } catch (error) {
        console.log(error);
      }
    };
    dataFetch();
  }, [author_id]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setPreviews(URL.createObjectURL(file));
      setData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!data.name || !data.designation) {
      toast.error("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("designation", data.designation);
    formData.append("image", data.image);

    try {
      const response = await ApiRequest("POST", `${authorUpdateEndPoint}/${author_id}`, formData);
      toast.success(response.message);
      onHide();
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };

  return (
    <>
      <Modal className="add-modal-area" show={show} onHide={onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Body>
          <button className="modal-close-button" onClick={onHide}><Icons name="cross" /></button>
          <form onSubmit={handleSubmit}>
            <div className="add-page-sections">Edit Author</div>

            <div className="row">
              <div className="col-md-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Author Name<small>*</small></label>
                  </div>
                  <input name="name" value={data.name} type="text" className="form-control" onChange={handleChange} required />
                </div>
              </div>

              <div className="col-md-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Designation<small>*</small></label>
                  </div>

                  <input type="text" value={data.designation} onChange={handleChange} required name="designation" className="form-control" placeholder="Designation" />
                </div>
              </div>
            </div>

            <div className="add-page-inputs input-add-image">
              <div className="label-wrap-add">
                <label>Author Image (80 × 80)<small>*</small></label>
              </div>
              <CustomImageUpload name="image"
                acceptedFormats={[".webp"]}
                onImageChange={handleChange}
                imagePreview={previews}
              />
            </div>

            <button type="submit" className="default-btn">Save Changes<span></span></button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
