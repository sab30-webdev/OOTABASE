import { Table, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendurl } from "./url/backendurl";
import { useParams } from "react-router-dom";
const Ordered = () => {
  // DISPLAY PART

  const { tno } = useParams();
  const [ordData, setOrdData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function call() {
      try {
        const { data } = await axios.get(`${backendurl}/bill/${tno}`);
        console.log(data);
        setOrdData(data);
      } catch (error) {
        console.log(error);
      }
    }
    call();
  }, [refresh]);

  // setInterval(() => {
  //   setRefresh(!refresh);
  // }, 3000);

  return (
    <div className="scroll-limit mx-3">
      <Table striped hover className="radius" style={{ width: "96%" }}>
        <thead>
          <tr className="trow">
            <th>Item Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {ordData.map((t, idx) => {
            return (
              <tr key={idx}>
                <td>{t.itemname}</td>
                <td>{t.qty}</td>
                <td>{t.price}</td>
                <td>
                  {t.i_status ? (
                    <Badge bg="success">Success</Badge>
                  ) : (
                    <Badge bg="danger">Pending</Badge>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
export default Ordered;
