import {
  Button,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendurl } from "./url/backendurl";

function MenuDisplay() {
  // DISPLAY PART
  const [menuData, setMenuData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    async function call() {
      try {
        const { data } = await axios.get(`${backendurl}/menu`);
        setMenuData(data);
        console.log("menuData",menuData);
      } catch (error) {
        console.log(error);
      }
    }
    call();
  }, [refresh]);
  // DELETION PART

  const Delete = async (id) => {
    let delData = {};
    delData.itemid = id;
    console.log(delData);
    try {
      const res = await axios.post(`${backendurl}/delmenu`, delData);
      console.log(res);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  // MODAL PART
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // INSERTION PART

  const handleChange = (e) => {
    setInsData({ ...insData, [e.target.name]: e.target.value });
  };
  const [insData, setInsData] = useState({ itemid: "", Iname: "", price: "" });

  const Submit = async (e) => {
    setShow(false);
    e.preventDefault();
    setRefresh(!refresh);

    try {
      const res = await axios.post(`${backendurl}/insertmenu`, insData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="gap">
      <Table striped bordered hover size="sm">
        <thead>
          <tr variant="primary">
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {menuData.map((t) => {
            return (
              <tr>
                <td>{t.itemid}</td>
                <td>{t.itemname}</td>
                <td>{t.rate}</td>
                <td>
                  <Button
                    className="bt1 shadow"
                    variant="primary"
                    onClick={() => Delete(t.itemid)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button className="bt1" onClick={handleShow}>
        Insert
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Insert Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="m-3" controlId="UID">
            <Form.Label>ItemID</Form.Label>
            <Form.Control
              className="shadow"
              type="text"
              placeholder="Enter Item ID"
              name="itemid"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="m-3" controlId="pass">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              className="shadow"
              type="text"
              placeholder="Enter Item Name"
              name="Iname"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="m-3" controlId="pass">
            <Form.Label>Price</Form.Label>
            <Form.Control
              className="shadow"
              type="text"
              placeholder="Enter Price"
              name="price"
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={Submit}>
            Add to Menu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default MenuDisplay;
