import React from "react";
import { Redirect, Route } from "react-router";

export const ProtectedAdminRoute = ({ children, ...props }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token && token.job === "admin") {
    return <Route {...props}>{children}</Route>;
  }
  return <Redirect to='/login' />;
};

export const ProtectedWaiterRoute = ({ children, ...props }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token && token.job === "waiter") {
    return <Route {...props}>{children}</Route>;
  }
  return <Redirect to='/login' />;
};

export const ProtectedKitchenRoute = ({ children, ...props }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token && token.job === "kitchen") {
    return <Route {...props}>{children}</Route>;
  }
  return <Redirect to='/login' />;
};
