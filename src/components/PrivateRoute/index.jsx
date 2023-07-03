import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthen } from "../AuthenContext";
import { LOCAL_STORAGE } from "../../constants/localStorage";

const PrivateRoute = ({ redirectPath = "/" }) => {
  const { openAuthenModal } = useAuthen();
  const isLogin = JSON.stringify(localStorage.getItem(LOCAL_STORAGE.token));

  if (isLogin === "false" || isLogin === "null" || isLogin === "undefined") {
    openAuthenModal();
    return <Navigate to={redirectPath} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
