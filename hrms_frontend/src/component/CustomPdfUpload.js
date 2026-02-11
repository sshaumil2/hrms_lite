import { useRef, useState, useEffect } from "react";

/**
 * CustomPdfUpload (safe, static until user selects a file)
 * - Keeps the same classNames/structure as your image upload
 * - Does NOT call external Icons (avoids crash if Icons map is missing)
 * - Forwards original change event to onPdfChange so your handleChange works
 */
const PdfFileIcon = ({ size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 13h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 17h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CustomPdfUpload = ({
  onPdfChange = () => {},
  pdfPreview = "",
  maxSize = 10 * 1024 * 1024,
  acceptedFormats = [".pdf"],
  name = "",
}) => {
  const fileInputRef = useRef();
  const [fileName, setFileName] = useState("");

  // If parent passes pdfPreview url, extract filename for display
  useEffect(() => {
    if (pdfPreview) {
      try {
        const parts = pdfPreview.split("/");
        const last = parts[parts.length - 1];
        setFileName(decodeURIComponent(last || "Uploaded PDF"));
      } catch {
        setFileName("Uploaded PDF");
      }
    }
  }, [pdfPreview]);

  const validateAndPass = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const extension = `.${file.name.split(".").pop().toLowerCase()}`;
    const normalizedAccepted = (acceptedFormats || [".pdf"]).map((f) =>
      f.toLowerCase()
    );
    const isValidFormat = normalizedAccepted.includes(extension);
    const isValidSize = !maxSize || file.size <= maxSize;

    if (!isValidFormat) {
      alert(`Only ${acceptedFormats.join(", ")} files are allowed.`);
      e.target.value = "";
      return;
    }

    if (!isValidSize) {
      alert(`File must be less than ${Math.floor(maxSize / 1024)} KB.`);
      e.target.value = "";
      return;
    }

    // Set local filename for display; parent will still create preview via onPdfChange
    setFileName(file.name);

    // Forward the original event so your handleChange works unchanged
    onPdfChange(e);
  };

  const handleWrapperClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="image-upload-wrapper" onClick={handleWrapperClick}>
      <div className="image-placeholder">
        <div className="added-img-icon">
          {fileName ? (
            <div className="pdf-file-preview" style={{ alignItems: "center", gap: "8px", display: "flex", flexWrap: "wrap", overflow: "hidden" }}>
              <PdfFileIcon />
              <p>{fileName}</p>
            </div>
          ) : (
            <>
              <PdfFileIcon />
              <p>Upload your PDF</p>
            </>
          )}
        </div>

        <small>{acceptedFormats.join(", ")} format</small>
      </div>

      <input
        type="file"
        accept={acceptedFormats.join(",")}
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={validateAndPass}
        name={name}
      />

      <button
        type="button"
        className="default-btn"
        onClick={(e) => {
          e.stopPropagation();
          if (fileInputRef.current) fileInputRef.current.click();
        }}
      >
        UPLOAD PDF <span></span>
      </button>
    </div>
  );
};

export default CustomPdfUpload;
