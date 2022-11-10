import { Nav, Tab, Row, Col } from "react-bootstrap";
import AddUser from "./AddUser";
import MenuDisplay from "./MenuDisp";
import StaffMgmt from "./StaffMgmt";
import Transact from "./Transact";
import "./Waiter.css";

const Admin = () => {
  const handleClick = () => {};
  return (
    <>
      <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
        <Row>
          <Col sm={3}>
            <Nav variant='pills' className='flex-column'>
              <Nav.Item>
                <Nav.Link eventKey='first'>Add Staff</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='second'>View Menu</Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={handleClick}>
                <Nav.Link eventKey='third'>View Staff</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='fourth'>Transactions</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey='first'>
                <AddUser />
              </Tab.Pane>
              <Tab.Pane eventKey='second'>
                <MenuDisplay />
              </Tab.Pane>
              <Tab.Pane eventKey='third'>
                <StaffMgmt handleClick={handleClick} />
              </Tab.Pane>
              <Tab.Pane eventKey='fourth'>
                <Transact />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default Admin;
