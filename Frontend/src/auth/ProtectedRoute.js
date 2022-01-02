import React from "react";
import { Redirect, Route } from "react-router";

export const ProtectedAdminRoute = ({ children, ...props }) => {
  if (localStorage.getItem("token") === "admin") {
    return <Route {...props}>{children}</Route>;
  }
  return <Redirect to="/login" />;
};

export const ProtectedWaiterRoute = ({ children, ...props }) => {
  if (localStorage.getItem("token") === "waiter") {
    return <Route {...props}>{children}</Route>;
  }
  return <Redirect to="/login" />;
};

export const ProtectedKitchenRoute = ({ children, ...props }) => {
  if (localStorage.getItem("token") === "kitchen") {
    return <Route {...props}>{children}</Route>;
  }
  return <Redirect to="/login" />;
};
