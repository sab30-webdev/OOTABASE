import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import Shop from "./Shop";
import "./Waiter.css";

const OrderItem = () => {
  const { tno } = useParams();
  return (
    <>
      <Row>
        <div id="custDetail">
          <h4> Order for Table No. {tno}</h4>
        </div>
        <Shop tno={tno} className="mx-2 my-2" />
      </Row>
    </>
  );
};

export default OrderItem;
