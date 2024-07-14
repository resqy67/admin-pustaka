import React from "react";
// import { LogoDisdik } from "../logo";
import { Sidebar } from "../pages/dashboard/sidebar";
import { NavbarAside } from "../pages/dashboard/navbar";
import { Drawer } from "@material-tailwind/react";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [open, setOpen] = React.useState(0);
  // const handleOpen = (value) => {
  //   setOpen(open === value ? 0 : value);
  // };
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsSidebarOpen(false);

  const toggleSidebar = (value) => {
    setIsSidebarOpen(!isSidebarOpen);
    // setIsDrawerOpen(true);
    // setOpen(open === value ? 0 : value);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {/* <aside className={`md:flex ${isSidebarOpen ? "block" : "hidden"}`}>
        <Sidebar />
      </aside> */}
      {isSidebarOpen ? (
        <aside className="block">
          <Drawer open={isSidebarOpen} onClose={closeDrawer}>
            {/* <div className="p-4 flex justify-between items-center ">
              <LogoDisdik />
            </div> */}
            <Sidebar />
          </Drawer>
        </aside>
      ) : (
        <aside className="md:flex flex-col hidden">
          <Sidebar />
        </aside>
      )}
      <main className="flex-1 overflow-y-auto bg-gray-100">
        {/* Main Content */}
        <NavbarAside
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="container mx-auto lg:px-0 lg:py-0 md:px-4 md:py-8">
          {/* Content */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
