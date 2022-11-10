import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./assets/Poppins-Medium.ttf";
import { Toaster } from "react-hot-toast";

ReactDOM.render(
  <Router>
    <App />
    <Toaster />
  </Router>,
  document.getElementById("root")
);
