import React, { useState } from "react";
import { Tab, Row, Col, Nav, Form, Button } from "react-bootstrap";
import items from "./Menu";
import Shop from "./Shop";
import Navbar from "./Navbar1";
import "./Waiter.css";

const CustIn = ({ TNo }) => {
  // const [flag, setFlag] = useState(false);
  return (
    <>
      <div id="login-bg">
        <div id="lock-front" className="shadow">
          <h4>Table No. {TNo}</h4>
          <Form>
            <Form.Group className="m-3" controlId="UID">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CName"
                className="shadow"
              />
            </Form.Group>

            <Form.Group className="m-3" controlId="pass">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Ph No"
                className="shadow"
              />
            </Form.Group>
            <Button
              className="m-3"
              variant="primary"
              // onClick={() => {
              //   setFlag(true);
              // }}
              type="submit"
            >
              Submit
            </Button>
            {/* {flag ? <WaitView /> : null} */}
          </Form>
        </div>
      </div>
    </>
  );
};

const WaitView = ({ TNo, CName, CPh }) => {
  const [menuItems, setMenuItems] = useState(items);
  return (
    <>
      <Row>
        <div id="custDetail">
          <h4>Table No. {TNo}</h4>
        </div>
        <Shop items={menuItems} className="mx-2 my-2" />
      </Row>
    </>
  );
};
function OrderItem() {
  return (
    <>
      <Navbar />
      <Tab.Container id="tablist" defaultActiveKey="first">
        <Row>
          <Col sm={3} id="sidebar">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Table 1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Table 2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Table 3</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">Table 4</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth">Table 5</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sixth">Table 6</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="seventh">Table 7</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="eighth">Table 8</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <CustIn TNo="1" />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <WaitView TNo="2" />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <CustIn TNo="3" />
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <CustIn TNo="4" />
              </Tab.Pane>
              <Tab.Pane eventKey="fifth">
                <CustIn TNo="5" />
              </Tab.Pane>
              <Tab.Pane eventKey="sixth">
                <CustIn TNo="6" />
              </Tab.Pane>
              <Tab.Pane eventKey="seventh">
                <CustIn TNo="7" />
              </Tab.Pane>
              <Tab.Pane eventKey="eighth">
                <CustIn TNo="8" />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}

export default OrderItem;

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
