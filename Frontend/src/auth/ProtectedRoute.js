import React from "react";
import { Redirect, Route } from "react-router";

export const ProtectedAdminRoute = ({ children, ...props }) => {
  if (JSON.parse(localStorage.getItem("token")).job === "admin") {
    return <Route {...props}>{children}</Route>;
  }
  return <Redirect to='/login' />;
};

export const ProtectedWaiterRoute = ({ children, ...props }) => {
  if (JSON.parse(localStorage.getItem("token")).job === "waiter") {
    return <Route {...props}>{children}</Route>;
  }
  return <Redirect to='/login' />;
};

export const ProtectedKitchenRoute = ({ children, ...props }) => {
  if (JSON.parse(localStorage.getItem("token")).job === "kitchen") {
    return <Route {...props}>{children}</Route>;
  }
  return <Redirect to='/login' />;
};
