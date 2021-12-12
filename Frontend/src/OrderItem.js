import React, { useState } from 'react';
import {Tab,Row,Col,Nav,Form,Button,ListGroup} from "react-bootstrap"
import items from './Menu'

function Sonnet(props) {
  return <h1>Hello, {props.name}</h1>;
}
const Cust_in=()=>{

return<> 
<div id="login-bg">
<div id="lock-front">

  <Form>
  <Form.Group className="m-3" controlId="UID">
    <Form.Label>Customer Name</Form.Label>
    <Form.Control type="text" placeholder="Enter email" />
  </Form.Group>

  <Form.Group className="m-3" controlId="pass">
    <Form.Label>Phone Number</Form.Label>
    <Form.Control type="text" placeholder="Password" />
  </Form.Group>
  <Button className="m-3" variant="primary" type="submit">
    Submit
  </Button>
</Form>
</div>
</div>
</>
}
const Menu = ({ items }) => {
  return (
    <div className='section-center'>
      <ListGroup as="ul">
      {items.map((menuItem) => {
        const { id, itemname, price } = menuItem;
        return (
          
          <ListGroup.Item as="li" action onClick=''>
          <article key={id} className='menu-item'>
            <div className='item-info'>
              <header>
                <p className='left'>{itemname}</p>
                <p className='price'>Rs. {price}</p>
              </header>
            </div>
          </article>
          </ListGroup.Item>
        );
      })}
      </ListGroup>
    </div>
  );
};
function OrderItem(){
const [menuItems, setMenuItems] = useState(items);
return<> 
<Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
    <Col sm={3}>
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="first">Tab 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">Tab 2</Nav.Link>
        </Nav.Item>
          <Nav.Item>
          <Nav.Link eventKey="third">Tab 3</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="fourth">Tab 4</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
    <Col sm={9}>
      <Tab.Content>
        <Tab.Pane eventKey="first">
          <Cust_in />
        </Tab.Pane>
        <Tab.Pane eventKey="second">
          <Menu items={menuItems} />
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
</>
}

export default OrderItem