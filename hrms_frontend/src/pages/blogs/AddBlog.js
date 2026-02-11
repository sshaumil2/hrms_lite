import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiEndpoints } from "../../helper/ApiEndpoints";
import ApiRequest from "../../helper/ApiRequest";
import CustomSelect from "../../component/CustomSelect";
import CustomImageUpload from "../../component/CustomImageUpload";
import DynamicCKEditor from "../../component/DynamicCkEditor";
import { toast } from "react-toastify";
import AdminHeader from "../../component/AdminHeader";

const addBlogEndpoint = ApiEndpoints.adminBlogs.blogCreate;
const authorListEndpoint = ApiEndpoints.autor.authorList;
const categoryEndpoint = ApiEndpoints.category.categoryList;

export default function AddBlogAdmin() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [previews, setPreviews] = useState({ banner_image: null, thumbnail: null, section_image: null, section_image2: null });
  const [postData, setPostData] = useState({ category_id: "", author_id: "", date: new Date(), title: "", slug: "", banner_image: null, alt_banner_image: "", thumbnail: null, alt_thumbnail: "", section_image: null, alt_section_image: "", section_image2: null, alt_section_image2: "", h1_title: "", description1: "", h2_title: "", h2_description: "", h3_title: "", h3_description: "", h4_title: "", h4_description: "", h5_title: "", h5_description: "", h6_title: "", h6_description: "", h7_title: "", h7_description: "", h8_title: "", h8_description: "", h9_title: "", h9_description: "", h10_title: "", h10_description: "", brief: "", faqs: [{ question: "", answer: "" }, { question: "", answer: "" },] });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiRequest("GET", categoryEndpoint);
        setCategories(response?.blog_categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      }
    };

    const fetchAuthors = async () => {
      try {
        const response = await ApiRequest("GET", authorListEndpoint);
        setAuthors(response?.authors || []);
      } catch (error) {
        console.error("Failed to fetch authors:", error);
        setAuthors([]);
      }
    };

    fetchCategories();
    fetchAuthors();
  }, []);

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


  const handleEditorChange = (key, data) => {
    setPostData((prevState) => ({
      ...prevState,
      [key]: data,
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const [key, value] of Object.entries(postData)) {
      if (key !== "h3_title" && key !== "h3_description" && key !== "h4_title" && key !== "h4_description" && key !== "h5_title" && key !== "h5_description" && key !== "h6_title" && key !== "h6_description" && key !== "h7_title" && key !== "h7_description" && key !== "h8_title" && key !== "h8_description" && key !== "h9_title" && key !== "h9_description" && key !== "h10_title" && key !== "h10_description" && key !== "alt_section_image" && key !== "section_image" && key !== "section_image2" && key !== "alt_section_image2" && (value === "" || value === null)) {
        toast.error(`The field "${key}" is mandatory.`);
        return;
      }
    }

    const formData = new FormData();
    Object.entries(postData).forEach(([key, value]) => {
      if (key === "faqs") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await ApiRequest("POST", addBlogEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.message);
      navigate("/blog");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  // =========FAQS Functionality==========

  // 🔹 handle change for question/answer
  const handleFaqChange = (index, field, value) => {
    setPostData((prev) => {
      const updatedFaqs = [...prev.faqs];
      updatedFaqs[index][field] = value;
      return { ...prev, faqs: updatedFaqs };
    });
  };

  // 🔹 add new FAQ
  const addFaq = () => {
    setPostData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  // 🔹 remove FAQ
  const removeFaq = (index) => {
    setPostData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  // =======FAQs Functionality End==========

  const pagename = {
    name: 'Blog Management',
    user: 'Admin',
    innerpage: 'Blog Management / Blog / Add Blog'
  }

  return (
    <>
      <AdminHeader pagename={pagename} />
      <div className="add-content-page">
        <form id="blogAdd" onSubmit={handleSubmit}>

          <div className="add-content-wrap">
            <div className="row">

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>title<small>*</small></label>
                  </div>
                  <input onChange={handleChange} name="title" type="text" className="form-control" placeholder="Enter Title" />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>slug<small>*</small></label>
                  </div>
                  <input onChange={handleChange} name="slug" type="text" className="form-control" placeholder="Enter Slug" />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>category<small>*</small></label>
                  </div>
                  <CustomSelect onChange={handleChange} name={"category_id"} options={categories} placeholder="Select Category" />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Date<small>*</small></label>
                  </div>
                  <input onChange={handleChange} name="date" type="date" className="form-control" placeholder="Enter Author Name" />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Author Name<small>*</small></label>
                  </div>
                  <CustomSelect onChange={handleChange} name="author_id" options={authors} placeholder="Select Author Name" />
                </div>
              </div>

            </div>
          </div>

          <div className="add-content-wrap">
            <div className="row">
              <div className="col-lg-12">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Short Description<small>*</small></label>
                  </div>
                  <input value={postData.brief} onChange={handleChange} name="brief" type="text" className="form-control" placeholder="Short Description" />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Content 1 Title<small>*</small></label>
                  </div>
                  <input onChange={handleChange} name="h1_title" type="text" className="form-control" placeholder="Enter Title" />
                </div>

                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label> Content 1 Description<small>*</small></label>
                  </div>
                  <DynamicCKEditor data={postData.description1} onChange={(event) => handleEditorChange("description1", event?.editor?.getData())} />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Content 2 title <small>*</small></label>
                  </div>
                  <input value={postData.h2_title} onChange={handleChange} name="h2_title" type="text" className="form-control" placeholder="Enter Title" />
                </div>

                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label> Content 2 Description<small>*</small></label>
                  </div>
                  <DynamicCKEditor data={postData.h2_description} onChange={(event) => handleEditorChange("h2_description", event?.editor?.getData())} />
                </div>
              </div>
            </div>
          </div>

          <div className="add-content-wrap">
            <div className="row">

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Content 3 title <small></small></label>
                  </div>
                  <input value={postData.h3_title} onChange={handleChange} name="h3_title" type="text" className="form-control" placeholder="Enter Title" />
                </div>

                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label> Content 3 Description<small></small></label>
                  </div>
                  <DynamicCKEditor data={postData.h3_description} onChange={(event) => handleEditorChange("h3_description", event?.editor?.getData())} />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Content 4 title <small></small></label>
                  </div>
                  <input value={postData.h4_title} onChange={handleChange} name="h4_title" type="text" className="form-control" placeholder="Enter Title" />
                </div>

                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label> Content 4 Description<small></small></label>
                  </div>
                  <DynamicCKEditor data={postData.h4_description} onChange={(event) => handleEditorChange("h4_description", event?.editor?.getData())} />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Content 5 title <small></small></label>
                  </div>
                  <input value={postData.h5_title} onChange={handleChange} name="h5_title" type="text" className="form-control" placeholder="Enter Title" />
                </div>

                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label> Content 5 Description<small></small></label>
                  </div>
                  <DynamicCKEditor data={postData.h5_description} onChange={(event) => handleEditorChange("h5_description", event?.editor?.getData())} />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Content 6 title <small></small></label>
                  </div>
                  <input value={postData.h6_title} onChange={handleChange} name="h6_title" type="text" className="form-control" placeholder="Enter Title" />
                </div>

                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label> Content 6 Description<small></small></label>
                  </div>
                  <DynamicCKEditor data={postData.h6_description} onChange={(event) => handleEditorChange("h6_description", event?.editor?.getData())} />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Content 7 title <small></small></label>
                  </div>
                  <input value={postData.h7_title} onChange={handleChange} name="h7_title" type="text" className="form-control" placeholder="Enter Title" />
                </div>

                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label> Content 7 Description<small></small></label>
                  </div>
                  <DynamicCKEditor data={postData.h7_description} onChange={(event) => handleEditorChange("h7_description", event?.editor?.getData())} />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Content 8 title <small></small></label>
                  </div>
                  <input value={postData.h8_title} onChange={handleChange} name="h8_title" type="text" className="form-control" placeholder="Enter Title" />
                </div>

                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label> Content 8 Description<small></small></label>
                  </div>
                  <DynamicCKEditor data={postData.h8_description} onChange={(event) => handleEditorChange("h8_description", event?.editor?.getData())} />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Content 9 title <small></small></label>
                  </div>
                  <input value={postData.h9_title} onChange={handleChange} name="h9_title" type="text" className="form-control" placeholder="Enter Title" />
                </div>

                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label> Content 9 Description<small></small></label>
                  </div>
                  <DynamicCKEditor data={postData.h9_description} onChange={(event) => handleEditorChange("h9_description", event?.editor?.getData())} />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Content 10 title <small></small></label>
                  </div>
                  <input value={postData.h10_title} onChange={handleChange} name="h10_title" type="text" className="form-control" placeholder="Enter Title" />
                </div>

                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label> Content 10 Description<small></small></label>
                  </div>
                  <DynamicCKEditor data={postData.h10_description} onChange={(event) => handleEditorChange("h10_description", event?.editor?.getData())} />
                </div>
              </div>

            </div>
          </div>

          <div className="add-content-wrap">
            <div className="row">
              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Banner Image Alt Tag<small>*</small></label>
                  </div>
                  <input value={postData.alt_banner_image} onChange={handleChange} name="alt_banner_image" type="text" className="form-control" placeholder="alt banner" />
                </div>

                <div className="add-page-inputs input-add-image">
                  <div className="label-wrap-add">
                    <label>Banner Image (1608 × 782)<small>*</small></label>
                  </div>
                  <CustomImageUpload name="banner_image"
                    // maxSize={100 * 1024} // 320KB
                    acceptedFormats={[".webp"]}
                    onImageChange={handleChange}
                    imagePreview={previews.banner_image}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Thumbnail Image Alt Tag<small>*</small></label>
                  </div>
                  <input value={postData.alt_thumbnail} onChange={handleChange} name="alt_thumbnail" type="text" className="form-control" placeholder="alt thumbnail" />
                </div>

                <div className="add-page-inputs input-add-image">
                  <div className="label-wrap-add">
                    <label>Thumbnail Image (472 × 320)<small>*</small></label>
                  </div>
                  <CustomImageUpload name="thumbnail"
                    // maxSize={550 * 1024}
                    acceptedFormats={[".webp"]}
                    onImageChange={handleChange}
                    imagePreview={previews.thumbnail} />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>First Section Image Alt Tag<small></small></label>
                  </div>
                  <input value={postData.alt_section_image} onChange={handleChange} name="alt_section_image" type="text" className="form-control" placeholder="alt first section image" />
                </div>

                <div className="add-page-inputs input-add-image">
                  <div className="label-wrap-add">
                    <label>First Section Image (1032 × 530)<small></small></label>
                  </div>
                  <CustomImageUpload name="section_image"
                    // maxSize={550 * 1024}
                    acceptedFormats={[".webp"]}
                    onImageChange={handleChange}
                    imagePreview={previews.section_image} />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Second Section Image Alt Tag<small></small></label>
                  </div>
                  <input value={postData.alt_section_image2} onChange={handleChange} name="alt_section_image2" type="text" className="form-control" placeholder="alt second section image" />
                </div>

                <div className="add-page-inputs input-add-image">
                  <div className="label-wrap-add">
                    <label>Second Section Image (1032 × 530)<small></small></label>
                  </div>
                  <CustomImageUpload name="section_image2"
                    // maxSize={550 * 1024}
                    acceptedFormats={[".webp"]}
                    onImageChange={handleChange}
                    imagePreview={previews.section_image2} />
                </div>
              </div>
            </div>
          </div>

          <div className="add-content-wrap">
            <h5>Faq Section</h5>
            <div className="row">

              {postData.faqs.map((faq, index) => (
                <div key={index} className="col-lg-6" style={{ position: "relative" }}>
                  <div className="add-page-inputs input-add-image">
                    <div className="label-wrap-add">
                      <label>Question<small>*</small></label>
                    </div>
                    <input required className="form-control" type="text" placeholder={`Question ${index + 1}`} value={faq.question} onChange={(e) => handleFaqChange(index, "question", e.target.value)} />
                  </div>

                  <div className="add-page-inputs input-add-image">
                    <div className="label-wrap-add">
                      <label>Answer<small>*</small></label>
                    </div>
                    <input required className="form-control" placeholder={`Answer ${index + 1}`}
                      value={faq.answer} onChange={(e) => handleFaqChange(index, "answer", e.target.value)} />
                  </div>
                  {index >= 2 && (
                    <button type="button" style={{ position: "absolute", background: "linear-gradient(270deg,#e20814,#a80008)", top: "5px", right: "10px", color: "#fff", border: "none", borderRadius: "8px", fontSize: "12px", padding: "3px 15px" }} onClick={() => removeFaq(index)}>
                      REMOVE
                    </button>
                  )}
                </div>
              ))}

              <div className="col-lg-12 text-center">
                <button type="button" className="add-faqs" onClick={addFaq} style={{ background: "green", top: "5px", right: "10px", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", padding: "5px 15px", marginTop: "15px" }}>
                  Add New Faq
                </button>
              </div>
            </div>
          </div>

        </form>
        <button type="submit" form="blogAdd" className="default-btn">publish <span></span></button>
      </div>
    </>
  );
}
