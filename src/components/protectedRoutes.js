import { Outlet, Navigate } from "react-router-dom";
import Login from "layouts/Login";

const validateToken = () => {
  let token = localStorage.getItem("token");
  return token;
};

const checkAdmin = () => {
  let isAdmin = localStorage.getItem("admin") === "true";
  return isAdmin;
};

export function CheckAdmin() {
  return checkAdmin() ? <Outlet /> : <Navigate to="/" replace />;
}

export function CheckLogin() {
  return validateToken() ? <Outlet /> : <Login />;
}
