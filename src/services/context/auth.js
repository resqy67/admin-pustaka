import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// import { postLogin } from "../api";
import { postLogin } from "../postData";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  // ini untuk authentikasi login
  const login = async (email, password) => {
    try {
      const options = {
        email,
        password,
      };
      const response = await postLogin(options);
      // console.log("response", response.data.data.access_token);
      setCookie("token", response.data.data.token);
      console.log("cookies dari auth :", cookies);
      navigate("/dashboard");
    } catch (error) {
      console.log("error", error);
      console.error(error);
    }
  };

  const logout = async () => {
    // removeCookie("token");
    navigate("/");
  };

  // ini untuk menyimpan data cookies
  const value = useMemo(() => ({ cookies, login, logout }), [cookies]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
