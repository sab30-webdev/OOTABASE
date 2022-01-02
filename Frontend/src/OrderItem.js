import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import Shop from "./Shop";
import "./Waiter.css";
import Ordered from "./Ordered";

const OrderItem = () => {
  const { tno } = useParams();

  return (
    <>
      <Row>
        <div id="custDetail" className="ms-3">
          <h4 className="mx-3"> Order for Table No. {tno}</h4>
        </div>
        <Shop tno={tno} />
      </Row>
      <Row>
        <Ordered tno={tno} />
      </Row>
    </>
  );
};

export default OrderItem;
