import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendurl } from "./url/backendurl";

function StaffMgmt() {
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
    try {
      await axios.post(`${backendurl}/delstaff`, delData);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='gap px-3'>
      <Table striped hover size='sm' className='radius'>
        <thead>
          <tr className='trow'>
            <th>UID</th>
            <th>Name</th>
            <th>Job</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((t, idx) => {
            return (
              <tr key={idx}>
                <td>{t.uid}</td>
                <td>{t.name}</td>
                <td>{t.job}</td>
                <td>
                  <Button
                    className='delbtn shadow'
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
