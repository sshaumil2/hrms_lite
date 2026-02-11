import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../pages/sidebar/SideBar";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return (
    <>
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <main className={`admin-main ${isOpen ? "close" : "open"}`}>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
