import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendurl } from "./url/backendurl";
import "./Waiter.css";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import { foodStat, setFood } from "./fire/fire";

function MenuDisplay() {
  // DISPLAY PART
  const [orderData, setOrderData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const db = getFirestore();

  useEffect(() => {
    onSnapshot(doc(db, "oota/kitchen"), async (doc) => {
      sendToKitchen();
    });
  }, []);

  useEffect(() => {
    sendToKitchen();
  }, [refresh]);

  async function sendToKitchen() {
    try {
      const { data } = await axios.get(`${backendurl}/kitchen`);
      setOrderData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const notifyFoodReady = (tno, itemname) => {
    setFood(tno, itemname);
  };

  const Delete = async (itemid, ordid, tno, itemname) => {
    notifyFoodReady(tno, itemname);
    let delData = {};
    delData.itemid = itemid;
    delData.orderid = ordid;
    try {
      await axios.post(`${backendurl}/delkitchen`, delData);
      foodStat();
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='gap px-3'>
      <Table striped hover size='sm'>
        <thead>
          <tr className='trow'>
            <th>Table No.</th>
            <th>Item Name</th>
            <th>Qty</th>
            <th>Orderid</th>
            <th>Status</th>
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
                    className='bt1 shadow'
                    variant='primary'
                    onClick={() =>
                      Delete(t.itemid, t.orderid, t.tno, t.itemname)
                    }
                  >
                    Prepared
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
