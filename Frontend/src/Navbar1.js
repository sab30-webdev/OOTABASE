import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logow from "./assets/OotaBaseBlack1.png";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { backendurl } from "./url/backendurl";

export default function Navbar1() {
  const history = useHistory();

  const handleClick = async () => {
    let tno = prompt("Enter table number for billing");
    try {
      const { data } = await axios.get(`${backendurl}/custinfo/${tno}`);
      if (data.length !== 0) {
        if (tno != null) history.push(`/billing/${tno}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async () => {
    let tno = prompt("Enter table no to check status");

    try {
      const { data } = await axios.get(`${backendurl}/custinfo/${tno}`);
      if (data.length !== 0) {
        if (tno != null) history.push(`/orderitem/${tno}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar bg='light' variant='light' style={{ padding: "0.3% 2%" }}>
      <Navbar.Brand
        onClick={() => {
          history.push("/login");
        }}
      >
        <img
          alt=''
          src={logow}
          height='50'
          className='d-inline-block align-top'
        />
      </Navbar.Brand>

      <Nav className='me-auto'>
        <Nav.Link
          onClick={() => {
            history.push("/booktable");
          }}
        >
          BookTable
        </Nav.Link>
        <Nav.Link onClick={handleClick}>Billing</Nav.Link>
        <Nav.Link onClick={handleStatus}>Status</Nav.Link>
      </Nav>
    </Navbar>
  );
}
