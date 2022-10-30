import React from "react";
import { useLocation } from "react-router-dom";
import Routers from "../../Routes/Routers";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = () => {
  const location = useLocation();
  const Signup = "/signup";
  const Login = "/login";
  return (
    <>
      <div>
      {location.pathname !== Signup && location.pathname !== Login && <Header />}
        <div>
          <Routers />
        </div>
        {location.pathname !== Signup && location.pathname !== Login && <Footer />}
      </div>
    </>
  );
};

export default Layout;
