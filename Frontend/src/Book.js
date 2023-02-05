import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Tab, Row, Col, Nav, Button, Form, Badge } from "react-bootstrap";
import axios from "axios";
import { backendurl } from "./url/backendurl";
import "./Waiter.css";
import { toast } from "react-hot-toast";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { setUser } from "./fire/fire";

const Book = () => {
  const [tables, setTables] = useState({});
  const [bookedTable, setbookedTable] = useState(1);
  const db = getFirestore();

  useEffect(() => {
    onSnapshot(doc(db, "tables/JV5rJ9L66JFo7KSQdagD"), async (doc) => {
      setTables(doc.data());
    });
  }, []);

  return (
    <>
      <Tab.Container id='tablist' defaultActiveKey='first'>
        <Row>
          <Col sm={3} id='sidebar'>
            <Nav variant='pills' className='flex-column'>
              {Object.keys(tables).map((t, idx) => (
                <Nav.Item
                  key={idx}
                  className={`point ${
                    tables[t].length > 0 ? "tableStatusInd" : ""
                  }`}
                >
                  <Nav.Link
                    className={`point ${
                      tables[t].length > 0 ? "tableStatusIndText " : ""
                    }`}
                    onClick={() => setbookedTable(t)}
                  >
                    Table No {t}{" "}
                    {tables[t] != "" ? (
                      <Badge bg='danger'>Booked by {tables[t]}</Badge>
                    ) : (
                      <Badge bg='success'>B</Badge>
                    )}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey='first'>
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
    setUser(TNo, true);
    let obj = { ...custData, t_status: 1, tno: TNo };
    let { cname, cphone } = custData;
    if (cname === "" || cphone === "" || cphone.length !== 10) {
      toast.error("Enter valid phone number");
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
        toast.error("Table is already booked");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id='login-bg'>
        <div id='lock-front' className='shadow'>
          <h4>Table No {TNo}</h4>
          <Form>
            <Form.Group className='m-3'>
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Customer Name'
                className='shadow'
                name='cname'
                onChange={(e) =>
                  setCustData({ ...custData, cname: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className='m-3'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Phone No'
                className='shadow'
                name='cphone'
                onChange={(e) =>
                  setCustData({ ...custData, cphone: e.target.value })
                }
              />
            </Form.Group>
            <Button className='m-3' variant='primary' onClick={lock}>
              Lock
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
