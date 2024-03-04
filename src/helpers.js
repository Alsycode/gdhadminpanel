import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"
export const storeUser = (data) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      username: data.user.username,
      jwt: data.jwt,
    })
  );
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};
export const userData = () => {
  const stringifiedUser = localStorage.getItem("user") || '""';
  return JSON.parse(stringifiedUser || {});
};

export const Protector = ({ Component }) => {
  const navigate = useNavigate();

  const { jwt } = userData();

  useEffect(() => {
    if (!jwt) {
      navigate("/loginform");
    }
  }, [navigate, jwt]);

  return <Outlet />;
};