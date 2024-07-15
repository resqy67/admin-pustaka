import React from "react";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";
import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../services/context/auth";
// import { LogoDisdik } from "../logo";
import { Link } from "react-router-dom";

export function Sidebar(isDrawerOpen, closeDrawer) {
  // const [open, setOpen] = React.useState(0);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // const handleOpen = (value) => {
  //   setOpen(open === value ? 0 : value);
  // };

  return (
    // <Drawer open={isDrawerOpen} onClose={closeDrawer}>
    <Card
      color="transparent"
      shadow={false}
      className="h-[calc(100vh-2rem)] w-full p-4"
    >
      <div className="mb-2 p-4">{/* <LogoDisdik /> */}</div>
      <List>
        <Link to="/dashboard">
          <ListItem>
            <ListItemPrefix>
              <ComputerDesktopIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link to="/list-data">
          <ListItem>
            <ListItemPrefix>
              <ComputerDesktopIcon className="h-5 w-5" />
            </ListItemPrefix>
            List Data Buku
          </ListItem>
        </Link>
        <Link to="/list-user">
          <ListItem>
            <ListItemPrefix>
              <ComputerDesktopIcon className="h-5 w-5" />
            </ListItemPrefix>
            List Data User
          </ListItem>
        </Link>
        <Link to="/add-category">
          <ListItem>
            <ListItemPrefix>
              <ComputerDesktopIcon className="h-5 w-5" />
            </ListItemPrefix>
            List Data Category
          </ListItem>
        </Link>
        <Link to="/list-loans">
          <ListItem>
            <ListItemPrefix>
              <ComputerDesktopIcon className="h-5 w-5" />
            </ListItemPrefix>
            List Data Peminjaman
          </ListItem>
        </Link>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
    // </Drawer>
  );
}
