import React from "react";
import RedirectPage from "./RedirectPage";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <RedirectPage />;
};

export default PrivateRoute;
