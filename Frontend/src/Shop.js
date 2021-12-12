import React from "react";
import items from "./data";
import { Row, Col, Button, ListGroup } from "react-bootstrap";

const Shop = () => {
  const [cart, setCart] = React.useState([]);
  const cartTotal = cart.reduce((total, { price = 0 }) => total + price, 0);

  const addToCart = (item) => {
    setCart((currentCart) => [...currentCart, item]);
    console.log(cart);
  };

  const removeFromCart = (item) => {
    setCart((currentCart) => {
      const indexOfItemToRemove = currentCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (indexOfItemToRemove === -1) {
        return currentCart;
      }

      return [
        ...currentCart.slice(0, indexOfItemToRemove),
        ...currentCart.slice(indexOfItemToRemove + 1),
      ];
    });
  };

  const amountOfItems = (id) => cart.filter((item) => item.id === id).length;

  const listItemsToBuy = () => (
    <div className="section-center scroll-limit">
      <ListGroup as="ul">
        {items.map((item) => (
          <ListGroup.Item as="li">
            <article key={item.id} className="menu-item">
              <div className="item-info">
                <header>
                  <p className="menu-left">{item.name}</p>
                  <p className="menu-price">Rs. {item.price}</p>
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
    // <div key={item.id}>
    //   {`${item.name}: Rs${item.price}`}
    //   <button type="submit" onClick={() => addToCart(item)}>
    //     Add
    //   </button>
    // </div>
  );

  const listItemsInCart = () => (
    <div className="section-center scroll-limit">
      <ListGroup as="ul">
        {items
          .filter((items) => amountOfItems(items.id) > 0)
          .map((item) => (
            <ListGroup.Item as="li">
              <article key={item.id} className="menu-item">
                <div className="item-info">
                  <header>
                    <p className="cart-left">
                      {item.name}({amountOfItems(item.id)})
                    </p>
                    <p className="cart-price">
                      Rs. {amountOfItems(item.id) * item.price}
                    </p>
                    <Button
                      className="cart-price"
                      type="submit"
                      onClick={() => removeFromCart(item)}
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

  items.map((item) => (
    <div key={item.id}>
      ({amountOfItems(item.id)} x ${item.price}) {`${item.name}`}
      <button type="submit" onClick={() => removeFromCart(item)}>
        Remove
      </button>
    </div>
  ));

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
          <div>Total: Rs {cartTotal}</div>
          <div>
            <Button onClick={() => setCart([])}>Clear</Button>
            <Button className="cart-price" onClick={() => setCart([])}>
              Order
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Shop;
