import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendurl } from "./url/backendurl";
import "./Waiter.css";

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

  // setInterval(() => {
  //   setRefresh(!refresh);
  // }, 3000);

  const Delete = async (itemid, ordid) => {
    let delData = {};
    delData.itemid = itemid;
    delData.orderid = ordid;
    console.log(delData);
    try {
      await axios.post(`${backendurl}/delkitchen`, delData);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="gap px-3">
      <Table striped hover size="sm">
        <thead>
          <tr className="trow">
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
                <td>{t.tno}</td>
                <td>{t.itemname}</td>
                <td>{t.qty}</td>
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
