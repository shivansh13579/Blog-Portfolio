import React from "react";
import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Header />
      <div className="w-full md:w-[70%] mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
