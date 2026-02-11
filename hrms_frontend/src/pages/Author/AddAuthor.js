import { useState } from "react";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints";
import { Modal } from "react-bootstrap";
import CustomImageUpload from "../../component/CustomImageUpload";
import { toast } from "react-toastify";
import Icons from "../../myIcon/Icons";

const addAuthorEndpoint = ApiEndpoints.autor.authorCreate;

export default function AddAuthor({ show, onHide }) {
  const [previews, setPreviews] = useState({image: null,});
  const [postData, setPostData] = useState({name:"", image: null, designation:""});
  
  const handleSubmit = async (event) => {
    event.preventDefault();

      if (!postData.name || !postData.designation || !postData.image) {
        toast.error("All fields are required.");
        return;
      }

      const formData = new FormData();
      formData.append("name", postData.name);
      formData.append("designation", postData.designation);
      formData.append("image", postData.image); // include the file

      try {
        const response = await ApiRequest("POST", addAuthorEndpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success(response.message);
        onHide();
      } catch (error) {
        console.error("There was an error creating the author!", error);
        toast.error("Failed to create author");
      }
  };


    const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (files) {
      const file = files[0];  
      // Update the previews state
      setPreviews((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }));
  
      // Update the postData state
      setPostData((prev) => ({
        ...prev,
        [name]: file, 
      }));
    } else {
      // For non-file inputs, update the postData state directly
      setPostData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <Modal className="add-modal-area" show={show} onHide={onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Body>
          <button className="modal-close-button" onClick={onHide}><Icons name="cross"/></button>
          <form onSubmit={handleSubmit}>
             <div className="add-page-sections">Add Author</div>

              <div className="row">
                <div className="col-md-6">
                  <div className="add-page-inputs">
                    <div className="label-wrap-add">
                      <label>Author Name<small>*</small></label>
                    </div>
                    <input name="name" type="text" onChange={handleChange} required className="form-control" placeholder="Enter Here"/>
                  </div>
                </div>

                 <div className="col-md-6">
                    <div className="add-page-inputs">
                      <div className="label-wrap-add">
                        <label>Designation<small>*</small></label>
                      </div>

                      <input type="text" onChange={handleChange} required  name="designation" className="form-control" placeholder="Designation"/>
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
                  imagePreview={previews.image}
                  />
              </div>

            <button type="submit" className="default-btn">add<span></span></button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
