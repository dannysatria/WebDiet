import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="mx-auto flex flex-col space-y-[4.5rem] max-w-screen-xl w-full px-4 pt-36 text-black">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
