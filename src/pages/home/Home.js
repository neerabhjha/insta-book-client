import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import { getMyInfo } from "../../redux/slices/appConfigSlice";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyInfo())
  }, [])
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Home;
