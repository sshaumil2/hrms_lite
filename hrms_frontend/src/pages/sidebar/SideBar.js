import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icons from "../../myIcon/Icons";

export default function SideBar({ isOpen, toggleSidebar }) {
  const [isBlogManagementOpen, setIsBlogManagementOpen] = useState(false);
  const [isSeoManagementOpen, setIsSeoManagementOpen] = useState(false);
  const [iscaseManagementOpen, setIscaseManagementOpen] = useState(false);
  const [isjobManagementOpen, setIsjobManagementOpen] = useState(false);
  const navigate = useNavigate();

  const toggleBlogManagement = () => setIsBlogManagementOpen((prev) => !prev);
  const toggleSeoManagement = () => setIsSeoManagementOpen((prev) => !prev);
  const toggleCaseManagement = () => setIscaseManagementOpen((prev) => !prev);
  const togglejobManagement = () => setIsjobManagementOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("TokenBigBin");
    navigate("/login");
  };

  return (
    <>
      <div className={`admin-logo-wrap ${isOpen ? "close" : "open"}`}>
        <img src="/logo.webp" alt="logo" className="img-responsive" />
        <button className="toggle-button" onClick={toggleSidebar}>
          ☰
        </button>
      </div>
      <div className={`admin-sidebar ${isOpen ? "close" : "open"}`}>
        <div className="scroller-sidebar">
          <ul style={isOpen
            ? { transition: "all 0.3s ease-in", opacity: "0" }
            : { transition: "all 0.3s ease-in", opacity: "1" }}>

            <li>
              <Link to="/"><span><img src="/assets/dashboard.webp" alt="icon" className="img-responsive" />Dashboard</span></Link>
            </li>

            <li className={`innertab ${isBlogManagementOpen ? "openlist" : ""}`} onClick={toggleBlogManagement}>
              <div><span><img src="/assets/blog-management.webp" alt="icon" className="img-responsive" /> Blog Management</span> <Icons name="arrowDown" /></div>
              <ul className={`nested-list ${isBlogManagementOpen ? "open" : "close"}`}>
                <li><Link to="blog">Blog</Link></li>
                <li><Link to="category">Category</Link></li>
                <li><Link to="author">Author</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/contact"><span><img src="/assets/blog-management.webp" alt="icon" className="img-responsive" />Contact</span></Link>
            </li>

            <li>
              <Link to="/business-contact"><span><img src="/assets/blog-management.webp" alt="icon" className="img-responsive" />Business Contact</span></Link>
            </li>

            <li>
              <Link to="/seo"><span><img src="/assets/seo-management.webp" alt="icon" className="img-responsive" />SEO</span></Link>
            </li> 
          </ul>
        </div>

        <button onClick={handleLogout} className="default-btn logout-button">Logout<span></span></button>
      </div>
    </>
  );
}
