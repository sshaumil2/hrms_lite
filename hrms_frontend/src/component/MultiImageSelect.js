import { useRef, useState, useEffect } from "react";
import Icons from "../myIcon/Icons";

const MultiImageSelect = ({
  onImageChange,
  imagePreview,
  maxSize,
  acceptedFormats = [".webp"],
  name = "",
}) => {
  const fileInputRef = useRef();
  const [isMultiple, setIsMultiple] = useState(false);

  useEffect(() => {
    // Reset file input value whenever `isMultiple` changes
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  }, [isMultiple]);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const toggleModeAndOpenSelector = (multiple) => {
    setIsMultiple(multiple);
    setTimeout(() => {
      handleUploadClick(); // Ensure selector opens after toggling the mode
    }, 0);
  };

  const validateAndPass = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
  
    // Validate each file independently
    for (const file of files) {
      const extension = `.${file.name.split(".").pop().toLowerCase()}`;
      const isValidFormat = acceptedFormats.includes(extension);
      // const isValidSize =  file.size <= maxSize;
  
      if (!isValidFormat) {
        alert(`Only ${acceptedFormats.join(", ")} files are allowed.`);
        return;
      }
  
      // if (!isValidSize) {
      //   alert(`Each file must be less than ${Math.floor(maxSize / 1024)}kb. File '${file.name}' exceeds the limit.`);
      //   return;
      // }
    }
  
    // Pass validated files to parent handler
    onImageChange(isMultiple ? files : files[0]);
  };
  return (
    <>
      <div className="image-upload-wrapper multi-image-upload">
        <div className="image-placeholder" onClick={handleUploadClick}>
          <div className="added-img-icon">
            {imagePreview ? (
              <img src={imagePreview} alt="preview" className="image-preview" />
            ) : (
              <Icons name="imageIcon" />
            )}
            <p>Drop or upload your image
            Size: (208 × 96 px)</p>
          </div>
          <small>
            {acceptedFormats.join(", ")} format 
            {/* (Max:{" "}{Math.floor(maxSize / 1024)}kb) */}
          </small>
        </div>

        <input
          type="file"
          accept={acceptedFormats.join(",")}
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={validateAndPass}
          name={name}
          multiple={isMultiple}
        />

        <div className="multi-select-button-group">
          <button
            type="button"
            className="default-btn"
            onClick={() => toggleModeAndOpenSelector(false)}
          >
            Single <span></span>
          </button>

          <button
            type="button"
            className="default-btn"
            onClick={() => toggleModeAndOpenSelector(true)}
          >
            Multiple <span></span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MultiImageSelect;


