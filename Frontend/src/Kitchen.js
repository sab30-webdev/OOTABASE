import {
  Button,
  Form,
  Nav,
  Tab,
  Row,
  Col,
  Modal,
  Table,
} from "react-bootstrap";
import logo from "./assets/OotaBaseLogo.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendurl } from "./url/backendurl";
import "./Admin.css";

function MenuDisplay() {
  // DISPLAY PART
  const [orderData, setOrderData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    async function call() {
      try {
        const { data } = await axios.get(`${backendurl}/kitchen`);
        // console.log("krkfker", res);
        setOrderData(data);

        console.log(orderData);
      } catch (error) {
        console.log(error);
      }
    }
    call();
  }, [refresh]);
  // DELETION PART

  const Delete = async (itemid, ordid) => {
    let delData = {};
    delData.itemid = itemid;
    delData.orderid = ordid;
    console.log(delData);
    try {
      const res = await axios.post(`${backendurl}/delkitchen`, delData);
      console.log(res);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="gap">
      <Table striped bordered hover size="sm">
        <thead>
          <tr variant="primary">
            <th>Table No.</th>
            <th>Item Name</th>
            <th>Qty</th>
            <th>Orderid</th>
            <th>Send</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((t) => {
            return (
              <tr>
                <td>{t.TNo}</td>
                <td>{t.IName}</td>
                <td>{t.Qty}</td>
                <td>{t.orderid}</td>
                <td>
                  <Button
                    className="bt1 shadow"
                    variant="primary"
                    onClick={() => Delete(t.itemid, t.orderid)}
                  >
                    Send
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
export default MenuDisplay;
