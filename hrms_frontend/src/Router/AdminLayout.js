import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../pages/sidebar/SideBar";
import ProtectedRoute from "../hoc/ProtectedRoutes";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return (
    <>
      {/* <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <main className={`admin-main ${isOpen ? "close" : "open"}`}>
        <Outlet />
      </main> */}


      <ProtectedRoute>
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <main className={`admin-main ${isOpen ? "close" : "open"}`}>
        <Outlet />
      </main>
    </ProtectedRoute>
    </>
  );
};

export default AdminLayout;
