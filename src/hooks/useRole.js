import React from "react";
import { useSelector } from "react-redux";

const useRole = () => {
  const role = useSelector((state) => state.user.user.role);
  console.log("test", role);
  return role;
};

export default useRole;
