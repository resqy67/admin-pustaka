import { IconButton, Navbar, Typography } from "@material-tailwind/react";
import React from "react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
export function NavbarAside({ toggleSidebar, isSidebarOpen, title }) {
  return (
    <Navbar
      variant="gradient"
      blurred={false}
      shadow={false}
      fullWidth={true}
      className="mx-auto max-h-screen mt-10 px-10 py-3 bg-transparent"
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex flex-row">
          <IconButton
            variant="text"
            ripple={false}
            className="mr-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
          <Typography variant="h3">{title}</Typography>
        </div>

        <div className="flex flex-row">
          {/* <IconButton
            variant="text"
            ripple={false}
            className="w-6 mr-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
          >
            <BellIcon className="h-8 w-8" strokeWidth={2} />
          </IconButton> */}
          <Typography variant="h6" className="mt-2 mr-3">
            Admin
          </Typography>
          <IconButton
            variant="text"
            ripple={false}
            className="w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
          >
            <UserCircleIcon className="h-8 w-8" strokeWidth={2} />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}
