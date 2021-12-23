import { Button, Form, Nav, Tab, Row, Col, Table } from "react-bootstrap";
import logo from "./assets/OotaBaseLogo.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendurl } from "./url/backendurl";
import Menu from "./Menu.js";
// import { toast } from "react-hot-toast";
import AddUser from "./AddUser";
import MenuDisplay from "./MenuDisp";
import StaffMgmt from "./StaffMgmt";
const Admin = () => {
  //  const [state,setState]=useState(0)

  const handleClick = () => {};

  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Add User</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">See Menu</Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={handleClick}>
                <Nav.Link eventKey="third">See Staff</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <AddUser />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <MenuDisplay />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <StaffMgmt handleClick={handleClick} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default Admin;
