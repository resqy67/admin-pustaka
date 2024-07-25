import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./auth";

// ini untuk melindungi route yang ada
export const ProtectRoutes = () => {
  const { cookies } = useAuth();
  console.log("ini dari protectRouter", cookies);
  return cookies.token ? <Outlet /> : <Navigate to="/" />;
};
