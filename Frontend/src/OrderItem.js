import React, { useState } from "react";
import { Tab, Row, Col, Nav, Form, Button } from "react-bootstrap";
import items from "./Menu";
import Shop from "./Shop";
import Navbar from "./Navbar1";
import "./Waiter.css";
import axios from "axios";
import { backendurl } from "./url/backendurl";

const OrderItem = () => {
  let tables = [1, 2, 3, 4];
  const [bookedTable, setbookedTable] = useState(1);
  return (
    <>
      <Navbar />
      <Tab.Container id="tablist" defaultActiveKey="first">
        <Row>
          <Col sm={3} id="sidebar">
            <Nav variant="pills" className="flex-column">
              {tables.map((t) => (
                <Nav.Item>
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

export default OrderItem;

const CustIn = ({ TNo }) => {
  const [showWaitView, setShowWaitView] = useState(false);
  const [custData, setCustData] = useState({ cname: "", cphone: "" });

  const lock = async () => {
    let data = { ...custData, t_status: 1, tno: TNo };

    try {
      const res = await axios.post(`${backendurl}/booktable`, data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    setShowWaitView(true);
    console.log(data);
  };

  return (
    <>
      {!showWaitView ? (
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
      ) : (
        <WaitView tno={TNo} />
      )}
    </>
  );
};

const WaitView = ({ tno }) => {
  const [menuItems, setMenuItems] = useState(items);
  return (
    <>
      <Row>
        <div id="custDetail">
          <h4> Order for Table No. {tno}</h4>
        </div>
        <Shop tno={tno} className="mx-2 my-2" />
      </Row>
    </>
  );
};

// const Menu = ({ items }) => {
//   return (
//     <div className="section-center">
//       <ListGroup as="ul">
//         {items.map((menuItem) => {
//           const { id, itemname, price } = menuItem;

//           return (
//             <ListGroup.Item as="li" action onClick="">
//               <article key={id} className="menu-item">
//                 <div className="item-info">
//                   <header>
//                     <p className="left">{itemname}</p>
//                     <Button
//                       type="submit"
//                       className="price" /*onClick={() => addToCart(menuItem)}*/
//                     >
//                       Add
//                     </Button>
//                     <p className="price">Rs. {price}</p>
//                   </header>
//                 </div>
//               </article>
//             </ListGroup.Item>
//           );
//         })}
//       </ListGroup>
//     </div>
//   );
// };
