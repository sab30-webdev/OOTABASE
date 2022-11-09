import { useEffect, useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";
import { backendurl } from "./url/backendurl";
import { nanoid } from "nanoid";
import { useHistory } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getStat, foodStat } from "./fire/fire";
import { Rating } from "react-simple-star-rating";


const Shop = ({ tno }) => {
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${backendurl}/menu`);
        setMenuItems(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const addToCart = (item) => {
    if (cart.length === 0) {
      setCart([{ ...item, qty: 1, price: item.rate }]);
    } else {
      let res = cart.filter((o) => o.itemid === item.itemid);
      if (res.length > 0) {
        let result = cart.map((o) =>
          o.itemid === item.itemid
            ? { ...o, qty: o.qty + 1, price: (o.qty + 1) * o.rate }
            : o
        );
        setCart(result);
      } else {
        setCart([...cart, { ...item, qty: 1, price: item.rate }]);
      }
    }
  };

  const removeFromCart = (id) => {
    let find = cart.filter((o) => o.itemid === id);
    if (find[0].qty === 1) {
      setCart(cart.filter((o) => o.itemid !== id));
    } else {
      setCart(
        cart.map((o) =>
          o.itemid === id
            ? { ...o, qty: o.qty - 1, price: (o.qty - 1) * o.rate }
            : o
        )
      );
    }
  };

  const Order = async () => {
    let orderid = nanoid();
    let err = false;
    cart.forEach(async (cartItem) => {
      let { itemid, qty, price } = cartItem;
      let obj = {
        tno,
        itemid,
        qty,
        price,
        orderid,
        i_status: 0,
      };
      try {
        await axios.post(`${backendurl}/order`, obj);
      } catch (error) {
        err = true;
        console.error(error);
      }
    });

    if (!err) {
      getStat();
      foodStat();
      toast.success("Order Success");
    } else {
      toast.error("Order failed");
    }
  };

  const cartTotal = () => {
    let total = 0;
    for (let item of cart) {
      total = total + item.price;
    }
    return total;
  };

  const goToBilling = () => {
    history.push(`/billing/${tno}`);
  };

  const listItemsToBuy = () => (
    <div className='ms-3 section-center scroll-limit mb-3 radius'>
      <Table striped hover>
        <thead>
          <tr className='trow'>
            <th>Item Name</th>
            <th>Price</th>
            <th>Rating</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item, idx) => (
            <tr key={idx}>
              <td key={item.itemid}>{item.itemname}</td>
              <td>Rs. {item.rate}</td>
              <td>
                <Rating initialValue={item.ratio} readonly={true} size={20} fillColor='#111' />
              </td>
              <td>
                <Button
                  className='addbtn'
                  type='submit'
                  onClick={() => addToCart(item)}
                >
                  +
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  const listItemsInCart = () => (
    <div className='section-center radius scroll-limit'>
      <Table striped hover className='mb-3 '>
        <thead>
          <tr className='trow'>
            <th>Item Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, idx) => (
            <tr key={idx}>
              <td key={item.itemid}>{item.itemname}</td>
              <td>{item.qty}</td>
              <td>Rs. {item.price}</td>
              <td>
                <Button
                  type='submit'
                  className='delbtn'
                  onClick={() => removeFromCart(item.itemid)}
                >
                  -
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  return (
    <div>
      <Row>
        <Col xs={12} md={10}>
          <div className=' mx-3 pb-2'>
            <h4 className=' ms-3 p-2  body'>MENU</h4>
            {listItemsToBuy()}
          </div>
        </Col>
        <Col xs={12} md={2}>
          <div>
            <p className=' px-1 mb-3'>Total: Rs {cartTotal()}</p>
            <Button className='button2 delbtn' onClick={() => setCart([])}>
              Clear
            </Button>
            <br />
            <Button className='my-3 button2 addbtn' onClick={Order}>
              Order
            </Button>
            <Button className='button2 billbtn' onClick={goToBilling}>
              Billing
            </Button>
          </div>
        </Col>
        <Col xs={12} md={12}>
          <div className=" mx-3 pb-2">
          <h4 className='p-2 body'>ORDER</h4>
          {listItemsInCart()}
          <p></p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Shop;
