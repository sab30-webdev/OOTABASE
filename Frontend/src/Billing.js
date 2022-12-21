import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import QRCode from 'react-qr-code'
import { backendurl } from "./url/backendurl";
import "./Waiter.css";
import { toast } from "react-hot-toast";
import { Rating } from "react-simple-star-rating";
import { setUser } from "./fire/fire";

const Billing = () => {
  const { tno } = useParams();
  const [upiId, setUpiId] = useState('')
  const [billData, setBillData] = useState([]);
  const [custData, setCustData] = useState({});
  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState({});
  const history = useHistory();

  useEffect(() => {
    async function getBill() {
      try {
        const { data } = await axios.get(`${backendurl}/bill/${tno}`);
        const res = await axios.get(`${backendurl}/custinfo/${tno}`);
        setBillData(data.orders);
        setUpiId(data.upi_id)
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

  const clear = async () => {
    setUser(tno, false);
    const billLen = [...new Set(billData.map((item) => item.itemid))].length;
    const ratingLen = Object.keys(ratings).length;
    if (billLen !== ratingLen) {
      toast.error("Please rate all food items!");
      return;
    }
    const billamt = billTotal();
    let obj = { cname, cphone, billamt };
    try {
      await axios.post(`${backendurl}/depositRating`, ratings);
      await axios.post(`${backendurl}/clear/${tno}`, obj);
      toast.success("Billing Successful");
      history.push("/booktable");
    } catch (e) {
      console.log(e);
    }
  };

  const handleRating = (rate, itemid) => {
    setRating(rate);
    setRatings({ ...ratings, [itemid]: rate });
  };

  const { cname, cphone, orderid } = custData;

  return (
    <div className='m-4'>
      <h3>Billing for Table {tno}</h3>
      <h5 style={{ float: "right" }}>Phone : {cphone}</h5>
      <h5>Customer Name : {cname}</h5>
      <h5>Orderid : {orderid}</h5>
      <Table striped hover>
        <thead>
          <tr style={{ color: "white", backgroundColor: "black" }}>
            <th>#</th>
            <th>Item</th>
            <th>Rate</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Ratings</th>
          </tr>
        </thead>
        <tbody>
          {billData.map((b, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{b.itemname}</td>
              <td>{b.rate}</td>
              <td>{b.qty}</td>
              <td>{b.price}</td>
              <td>
                <Rating
                  onClick={(rate) => handleRating(rate, b.itemid)}
                  ratingValue={rating}
                  size={20}
                  fillColor='#111'
                  allowFraction={true}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Total :Rs {billTotal()}</h3>
      {
        // Use UPI Code for payment
      }

      {// Check if the bill amt is 0 or nullish, and render QR only form non-zero amts
        billTotal() ?
          <p style={{ textAlign: "center" }}>
            {
              // Easiest way of handling payments without worrying about the payment processor
              // Dynamically generate QR Code to facilitate UPI Payments
            }
            <h4>Pay using UPI</h4>
            <QRCode value={`upi://pay?pa=${upiId}&pn=OOTABASE&am=${billTotal()}&tn=note_could_be_used_to_classify_payements`} />
          </p> : <></>}
      <Button className='button2 billbtn' onClick={clear}>
        Generate Bill
      </Button>
    </div>
  );
};

export default Billing;
