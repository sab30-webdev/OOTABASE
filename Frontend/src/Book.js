import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Tab, Row, Col, Nav, Button, Form } from "react-bootstrap";
import axios from "axios";
import { backendurl } from "./url/backendurl";
import "./Waiter.css";

const Book = () => {
  let tables = [1, 2, 3, 4, 5, 6, 7, 8];
  const [bookedTable, setbookedTable] = useState(1);

  return (
    <>
      <Tab.Container id="tablist" defaultActiveKey="first">
        <Row>
          <Col sm={3} id="sidebar">
            <Nav variant="pills" className="flex-column">
              {tables.map((t, idx) => (
                <Nav.Item key={idx}>
                  <Nav.Link onClick={() => setbookedTable(t)}>
                    Table {t}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <CustIn TNo={bookedTable} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default Book;

const CustIn = ({ TNo }) => {
  const [custData, setCustData] = useState({ cname: "", cphone: "" });
  const history = useHistory();

  const lock = async () => {
    let obj = { ...custData, t_status: 1, tno: TNo };

    let { cname, cphone } = custData;

    if (cname === "" || cphone === "" || cphone.length !== 10) {
      return;
    }

    try {
      const { data } = await axios.post(`${backendurl}/tablecheck`, {
        tno: TNo,
      });

      if (data[0].t_status === 0) {
        await axios.post(`${backendurl}/booktable`, obj);
        history.push(`/orderitem/${TNo}`);
      } else {
        alert("Table already booked");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id="login-bg">
        <div id="lock-front" className="shadow">
          <h4>Table No. {TNo}</h4>
          <Form>
            <Form.Group className="m-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Customer Name"
                className="shadow"
                name="cname"
                onChange={(e) =>
                  setCustData({ ...custData, cname: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="m-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone No"
                className="shadow"
                name="cphone"
                onChange={(e) =>
                  setCustData({ ...custData, cphone: e.target.value })
                }
              />
            </Form.Group>
            <Button className="m-3" variant="primary" onClick={lock}>
              Lock
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
