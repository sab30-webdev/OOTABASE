import {
  Button,
  Form,
  Nav,
  Tab,
  Row,
  Col,
  Modal,
  Table,
} from "react-bootstrap";
import logo from "./assets/OotaBaseLogo.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendurl } from "./url/backendurl";
import "./Admin.css";

function StaffMgmt({ handleClick }) {
  // DISPLAY PART

  const [staffData, setStaffData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function call() {
      try {
        const { data } = await axios.get(`${backendurl}/staff`);
        setStaffData(data);
      } catch (error) {
        console.log(error);
      }
    }
    call();
  }, [refresh]);

  // DELETION PART

  const Delete = async (id) => {
    let delData = {};
    delData.uid = id;
    console.log(delData);
    try {
      const res = await axios.post(`${backendurl}/delstaff`, delData);
      console.log(res);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="gap">
      <Table striped bordered hover size="sm">
        <thead>
          <tr variant="primary">
            <th>UID</th>
            <th>Name</th>
            <th>Job</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((t) => {
            return (
              <tr>
                <td>{t.uid}</td>
                <td>{t.name}</td>
                <td>{t.job}</td>
                <td>
                  <Button
                    className="bt1 shadow"
                    variant="primary"
                    onClick={() => Delete(t.uid)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
export default StaffMgmt;
