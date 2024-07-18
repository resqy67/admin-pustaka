import React from "react";
import FormLogin from "../pages/login/from-login";

const LoginLayout = () => {
  return (
    <div className="flex lg:flex-row flex-auto w-full h-screen">
      <div className="w-full lg:w-2/3 hidden lg:block">
        <img
          // src="https://source.unsplash.com/random"
          src="/intro.jpg"
          alt="login"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full h-screen lg:w-1/3 flex flex-col justify-center items-center">
        <div className="">
          <FormLogin />
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
