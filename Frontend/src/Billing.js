import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { backendurl } from "./url/backendurl";

const Billing = () => {
  const { tno } = useParams();
  const [billData, setBillData] = useState([]);
  const [custData, setCustData] = useState({});


  useEffect(() => {
    async function getBill() {
      try {
        const { data } = await axios.get(`${backendurl}/bill/${tno}`);
        const res = await axios.get(`${backendurl}/custinfo/${tno}`);
        setBillData(data);
        setCustData(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    getBill();
  }, [tno]);

  const billTotal = () => {
    let total = 0;
    for (let item of billData) {
      total = total + item.price;
    }
    return total;
  };

  const { cname, cphone, orderid } = custData;
   
  const clear = async () => {
    alert("Billed");
    const billamt = billTotal();
    let obj = { cname, cphone, billamt };
    console.log(obj);
    try {
      const res = await axios.post(`${backendurl}/clear/${tno}`, obj);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h3>Billing for table {tno}</h3>
      <h5>Customer Name : {cname}</h5>
      <h5>Phone : {cphone}</h5>
      <h5>Orderid : {orderid}</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Rate</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {billData.map((b, idx) => (
            <tr key={idx}>
              <td>{idx}</td>
              <td>{b.itemname}</td>
              <td>{b.rate}</td>
              <td>{b.qty}</td>
              <td>{b.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Total :{billTotal()}</h3>
      <Button variant="danger" onClick={clear}>
        Generate Bill
      </Button>
    </div>
  );
};

export default Billing;
