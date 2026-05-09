import React from "react";
import { Navigate } from "react-router-dom";
import isEmpty from "../utils/isEmpty";
import { browserRoutes } from "../routes/browserRoutes";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children, redirectLink, allowedRoles }) => {
  const user = useSelector((state) => state?.user?.user);

  if (isEmpty(user?.token)) {
    return (
      <Navigate
        to={redirectLink ? redirectLink : browserRoutes.LOGIN}
        replace
      />
    );
  }
  // Check if the user's role is allowed for this route
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    if (user?.role === "admin") {
      return <Navigate to={browserRoutes.PROPERTIES} replace />;
    }
    if (user?.role === "user") {
      return <Navigate to={browserRoutes.DASHBOARD} replace />;
    }
  }
  return children;
};

export default ProtectedRoutes;
