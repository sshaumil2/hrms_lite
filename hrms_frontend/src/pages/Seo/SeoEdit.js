import { useEffect, useState } from "react";
import AdminHeader from "../../component/AdminHeader";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints";
import { useNavigate, useParams } from "react-router-dom";

const seoEditEndpoint = ApiEndpoints.seo.seoEdit;
const seoUpdateEndpoint = ApiEndpoints.seo.seoUpdate;
export default function SeoEdit() {
  const {seo_id}=useParams();
  const [seoData, setSeoData] = useState({
    url: "",
    title: "",
    description: "",
    keywords: "",
    canonical_tag: "",
    faq_schema: "",
    og_locale: "",
    og_type: "",
    og_title: "",
    og_description: "",
    og_url: "",
    og_site_name: "",
    og_image: "",
    twitter_card:"",
    twitter_title:"",
    twitter_description:"",
    twitter_image:"",
    twitter_site:"",
    twitter_creator:"",
    article_schema: "",
    review_schema: "",
    organisation_schema: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiRequest("GET", `${seoEditEndpoint}${seo_id}`,);
        setSeoData(response.seo);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchData();
  }, [seo_id]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    
 setSeoData((prev) => ({
  ...prev,
  ["seo_id"]: seo_id,
}));
    try {
      const response = await ApiRequest("POST", seoUpdateEndpoint, seoData);
      console.log("update Seo:", response);
      if (response.error === false) {
        navigate("/seo");
      } else {
        console.error("Failed to update SEO:", response.message);
      }
    } catch (error) {
      console.error("Error updating SEO:", error);
    }
  };

  const pagename = {
    name: "SEO Management",
    user: "Admin",
    innerpage: "SEO Management / SEO / Edit SEO",
  };

  return (
    <>
      <AdminHeader pagename={pagename} />

      <div className="add-content-page">
        <form id="seoEdit" onSubmit={handleSubmit}>
          <div className="add-content-wrap">
            <div className="row">
              {/* URL */}
              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      Url<small>*</small>
                    </label>
                  </div>
                  <input type="text" name="url" required value={seoData.url}  onChange={handleChange} className="form-control" id="url" />
                </div>
              </div>

              {/* Title */}
              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      Title<small>*</small>
                    </label>
                  </div>
                  <input  type="text" name="title" required  value={seoData.title} onChange={handleChange} className="form-control"  id="title" />
                </div>
              </div>

              {/* Description */}
              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      Description<small>*</small>
                    </label>
                  </div>
                  <input   type="text"  name="description" required  value={seoData.description}  onChange={handleChange} className="form-control" id="description" />
                </div>
              </div>

              {/* Keywords */}
              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      Keywords<small>*</small>
                    </label>
                  </div>
                  <input  type="text"  name="keywords" required value={seoData.keywords}  onChange={handleChange} className="form-control" id="keywords"
                  />
                </div>
              </div>

              {/* Canonical Tag */}
              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      Canonical Tag<small>*</small>
                    </label>
                  </div>
                  <input   type="text"  name="canonical_tag" value={seoData.canonical_tag} onChange={handleChange} className="form-control"  id="canonical_tag" />
                </div>
              </div>

              {/* OG Fields */}
              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      OG Locale:<small></small>
                    </label>
                  </div>
                  <input type="text"  name="og_locale" value={seoData.og_locale} onChange={handleChange}  className="form-control" id="og_locale"  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      OG Type:<small></small>
                    </label>
                  </div>
                  <input type="text"  name="og_type"  value={seoData.og_type} onChange={handleChange}  className="form-control"  id="og_type"  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      OG Title:<small></small>
                    </label>
                  </div>
                  <input type="text" name="og_title"value={seoData.og_title}  onChange={handleChange} className="form-control" id="og_title" />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      OG Description:<small></small>
                    </label>
                  </div>
                  <input  type="text"   name="og_description" value={seoData.og_description} onChange={handleChange}   className="form-control"   id="og_description" />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      OG URL:<small></small>
                    </label>
                  </div>
                  <input  type="text"  name="og_url"value={seoData.og_url}  onChange={handleChange} className="form-control" id="og_url"   />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      OG Site Name:<small></small>
                    </label>
                  </div>
                  <input   type="text"  name="og_site_name" value={seoData.og_site_name} onChange={handleChange}className="form-control" id="og_site_name"  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      OG Image:<small></small>
                    </label>
                  </div>
                  <input   type="text" name="og_image"value={seoData.og_image}onChange={handleChange}  className="form-control"  id="og_image" />
                </div>
              </div>



              {/* Meta Twitter */}
              <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Twitter Card:</label>
                  </div>
                  <input  type="text" name="twitter_card" value={seoData.twitter_card} onChange={handleChange} className="form-control" id="twitter_card"
                  />
                </div>
              </div>


                <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Twitter Title</label>
                  </div>
                  <input  type="text" name="twitter_title" value={seoData.twitter_title} onChange={handleChange} className="form-control" id="twitter_title"
                  />
                </div>
              </div>




                <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Twitter Description</label>
                  </div>
                  <input  type="text" name="twitter_description" value={seoData.twitter_description} onChange={handleChange} className="form-control" id="twitter_description"
                  />
                </div>
              </div>


              
                <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>twitter Image</label>
                  </div>
                  <input  type="text" name="twitter_image" value={seoData.twitter_image} onChange={handleChange} className="form-control" id="twitter_image"
                  />
                </div>
              </div>


               <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Twitter Site</label>
                  </div>
                  <input  type="text" name="twitter_site" value={seoData.twitter_site} onChange={handleChange} className="form-control" id="twitter_site"
                  />
                </div>
              </div>



               <div className="col-lg-6">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>Twitter Creator</label>
                  </div>
                  <input  type="text" name="twitter_creator" value={seoData.twitter_creator} onChange={handleChange} className="form-control" id="twitter_creator"
                  />
                </div>
              </div>




            </div>
          </div>

          {/* FAQ Schema */}
          <div className="add-content-wrap">
            <div className="row">
              <div className="col-lg-12">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      FAQ Schema<small>*</small>
                    </label>
                  </div>
                  <textarea
                    name="faq_schema"
                    value={seoData.faq_schema}
                    onChange={handleChange}
                    className="form-control"
                    rows="5"
                    style={{ height: "auto" }}
                    id="faq_schema"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Article Schema */}
          <div className="add-content-wrap">
            <div className="row">
              <div className="col-lg-12">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      Article Schema<small>*</small>
                    </label>
                  </div>
                  <textarea
                    name="article_schema"
                    value={seoData.article_schema}
                    onChange={handleChange}
                    className="form-control"
                    rows="5"
                    style={{ height: "auto" }}
                    id="article_schema"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Review Schema */}
          <div className="add-content-wrap">
            <div className="row">
              <div className="col-lg-12">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      Review Schema<small>*</small>
                    </label>
                  </div>
                  <textarea
                    name="review_schema"
                    value={seoData.review_schema}
                    onChange={handleChange}
                    className="form-control"
                    rows="5"
                    style={{ height: "auto" }}
                    id="review_schema"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Organisation Schema */}
          <div className="add-content-wrap">
            <div className="row">
              <div className="col-lg-12">
                <div className="add-page-inputs">
                  <div className="label-wrap-add">
                    <label>
                      Organisation Schema<small>*</small>
                    </label>
                  </div>
                  <textarea
                    name="organisation_schema"
                    value={seoData.organisation_schema}
                    onChange={handleChange}
                    className="form-control"
                    rows="5"
                    style={{ height: "auto" }}
                    id="organisation_schema"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </form>

        <button type="submit" form="seoEdit" className="default-btn">
          Publish <span></span>
        </button>
      </div>
    </>
  );
}
