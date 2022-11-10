import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendurl } from "./url/backendurl";

function Transact() {
  // DISPLAY PART

  const [tranData, setTranData] = useState([]);

  useEffect(() => {
    async function call() {
      try {
        const { data } = await axios.get(`${backendurl}/transact`);
        setTranData(data);
      } catch (error) {
        console.log(error);
      }
    }
    call();
  }, []);

  return (
    <div className="gap px-3">
      <Table striped hover size="sm">
        <thead>
          <tr className="trow">
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Bill Amt</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {tranData.map((t, idx) => {
            return (
              <tr key={idx}>
                <td>{t.cname}</td>
                <td>{t.cphone}</td>
                <td>{t.billamt}</td>
                <td>{t.timestamp}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
export default Transact;
