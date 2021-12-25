import { Button, Form } from "react-bootstrap";
import logo from "./assets/OotaBaseLogo.png";
import { useState } from "react";
import axios from "axios";
import { backendurl } from "./url/backendurl";
// import { toast } from "react-hot-toast";

const AddUser = () => {
  const [adminData, setAdminData] = useState({ uid: "", name: "", job: "" });

  const Submit = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post(`${backendurl}/auth/admin`, adminData);
      if(data==="success")
      {
        alert("User added Successfully")
      }else{
        alert("Failed")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  return (
    <div id="login-bg">
      <div id="login-front" className="shadow">
        <Form>
          <img src={logo} className="logo" alt="" />
          <h1 style={{ textDecoration: "underline" }}>Set User</h1>
          <Form.Group className="m-3" controlId="UID">
            <Form.Label>UID</Form.Label>
            <Form.Control
              className="shadow"
              type="text"
              placeholder="Enter UID"
              name="uid"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="m-3" controlId="pass">
            <Form.Label>Emp Name</Form.Label>
            <Form.Control
              className="shadow"
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Select
            className="m-3 class-select shadow"
            aria-label="Job"
            name="job"
            onChange={handleChange}
          >
            <option selected disabled>
              Job
            </option>
            <option value="Waiter">Waiter</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Admin">Admin</option>
          </Form.Select>
          <Button
            className="bt1 shadow"
            variant="primary"
            onClick={Submit}
          >
            Set User
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddUser;
