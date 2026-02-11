import { useRef } from "react";
import Icons from "../myIcon/Icons";

const CustomImageUpload = ({ onImageChange = ()=>{}, imagePreview, maxSize , acceptedFormats, name=""}) => {
  const fileInputRef = useRef();

  const validateAndPass = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const extension = `.${file.name.split(".").pop().toLowerCase()}`;
    const isValidFormat = acceptedFormats.includes(extension);
    const isValidSize = file.size <= maxSize;

    if (!isValidFormat) {
      alert(`Only ${acceptedFormats.join(", ")} files are allowed.`);
      return;
    }

    // if (!isValidSize) {
    //   alert(`File must be less than ${Math.floor(maxSize / 1024)}kb.`);
    //   return;
    // }

    // Pass to parent handler
    onImageChange(e);
  };

  return (
    <div className="image-upload-wrapper" onClick={() => fileInputRef.current.click()}>
        <div className="image-placeholder">
          <div className="added-img-icon">
          {imagePreview ? (
        <img src={imagePreview} alt="preview" className="image-preview" />
      ) : (<Icons  name="imageIcon" />)}
            
            <p>Upload your image</p>
          </div>
          <small>
            {acceptedFormats.join(", ")} format 
            {/* (Max:{" "} {Math.floor(maxSize / 1024)}kb) */}
          </small>
        </div>
  
      <input
        type="file"
        accept={acceptedFormats.join(",")}
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={validateAndPass}
        name={name}
      />

      <button type="button" className="default-btn">UPLOAD IMAGE <span></span></button>
    </div>
  );
};

export default CustomImageUpload;
