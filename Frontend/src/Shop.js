import { useEffect, useState } from "react";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import axios from "axios";
import { backendurl } from "./url/backendurl";
import { nanoid } from "nanoid";

const Shop = ({ tno }) => {
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

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

  // useEffect(() => {
  //   console.log("cart", cart);
  // }, [cart]);

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

  const Order = () => {
    let orderid = nanoid();
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
      console.log(obj);

      let { data } = await axios.post(`${backendurl}/order`, obj);
      if (data === "Success") {
        alert("Order Success");
      }
    });
  };

  const cartTotal = () => {
    let total = 0;
    for (let item of cart) {
      total = total + item.price;
    }
    return total;
  };

  const listItemsToBuy = () => (
    <div className="section-center scroll-limit">
      <ListGroup as="ul">
        {menuItems.map((item) => (
          <ListGroup.Item as="li">
            <article key={item.itemid} className="menu-item">
              <div className="item-info">
                <header>
                  <p className="menu-left">{item.itemname}</p>
                  <p className="menu-price">Rs. {item.rate}</p>
                  <Button
                    type="submit"
                    className="menu-price"
                    onClick={() => addToCart(item)}
                  >
                    Add
                  </Button>
                </header>
              </div>
            </article>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );

  const listItemsInCart = () => (
    <div className="section-center scroll-limit">
      <ListGroup as="ul">
        {cart.map((item) => (
          <ListGroup.Item as="li">
            <article key={item.itemid} className="menu-item">
              <div className="item-info">
                <header>
                  <p className="cart-left">
                    {item.itemname}({item.qty})
                  </p>
                  <p className="cart-price">Rs. {item.price}</p>
                  <Button
                    className="cart-price"
                    type="submit"
                    onClick={() => removeFromCart(item.itemid)}
                  >
                    Remove
                  </Button>
                </header>
              </div>
            </article>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );

  return (
    <div>
      <Row>
        <Col xs={12} md={7}>
          <h4>MENU</h4>
          {listItemsToBuy()}
        </Col>
        <Col xs={12} md={5}>
          <h4>ORDER</h4>
          {listItemsInCart()}
          <div>Total: Rs {cartTotal()}</div>
          <div>
            <Button onClick={() => setCart([])}>Clear</Button>
            <Button className="cart-price" onClick={Order}>
              Order
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Shop;
