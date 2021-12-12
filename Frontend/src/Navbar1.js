import React from "react";
import { Navbar } from "react-bootstrap";
import logow from "./assets/OotaBaseBlack1.png";

export default function Navbar1() {
  return (
    <Navbar bg="light" variant="light" style={{ padding: "0.3% 2%" }}>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={logow}
          height="50"
          className="d-inline-block align-top"
        />{" "}
      </Navbar.Brand>
    </Navbar>
  );
}
