import { Table, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendurl } from "./url/backendurl";
import { useParams } from "react-router-dom";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";

const Ordered = () => {
  const { tno } = useParams();
  const [ordData, setOrdData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const db = getFirestore();

  useEffect(() => {
    onSnapshot(doc(db, "foodstatus/D7o26s9vkc66Aw577GlN"), async (doc) => {
      loadFoodStatus();
    });
  }, []);

  useEffect(() => {
    loadFoodStatus();
  }, [refresh]);

  async function loadFoodStatus() {
    try {
      const { data } = await axios.get(`${backendurl}/bill/${tno}`);
      setOrdData(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='scroll-limit mx-3'>
      <Table striped hover className='radius' style={{ width: "96%" }}>
        <thead>
          <tr className='trow'>
            <th>Item Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {ordData.map((t, idx) => (
            <tr key={idx}>
              <td>{t.itemname}</td>
              <td>{t.qty}</td>
              <td>{t.price}</td>
              <td>
                {t.i_status ? (
                  <Badge bg='success'>Ready</Badge>
                ) : (
                  <Badge bg='danger'>Cooking</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default Ordered;
