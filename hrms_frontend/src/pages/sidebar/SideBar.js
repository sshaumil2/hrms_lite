import { Link } from "react-router-dom";

export default function SideBar({ isOpen, toggleSidebar }) {

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

            <li>
              <Link to="/employee"><span><img src="/assets/blog-management.webp" alt="icon" className="img-responsive" />Employees</span></Link>
            </li>

            <li>
              <Link to="/attendance"><span><img src="/assets/blog-management.webp" alt="icon" className="img-responsive" />Attendance</span></Link>
            </li>

            <li>
              <Link to="/present-days"><span><img src="/assets/blog-management.webp" alt="icon" className="img-responsive" />Empoyees Present Days</span></Link>
            </li>

            <li>
              <Link to="/emp-attendance"><span><img src="/assets/blog-management.webp" alt="icon" className="img-responsive" />Empoyees Attendance</span></Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
