import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { backendurl } from "./url/backendurl";
import "./Waiter.css";
import { toast } from "react-hot-toast";
import { Rating } from "react-simple-star-rating";
import { setUser, clearFood } from "./fire/fire";

const Billing = () => {
  const { tno } = useParams();
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

  const clear = async () => {
    setUser(tno, false);
    clearFood(tno);
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
      <Button className='button2 billbtn' onClick={clear}>
        Generate Bill
      </Button>
    </div>
  );
};

export default Billing;
