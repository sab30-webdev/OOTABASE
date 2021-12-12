import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import logo from "../assets/OotaBaseLogo1.png";
import axios from "axios";
import { backendurl } from "../url/backendurl";

const Register = () => {
  const [regData, setRegData] = useState({
    uid: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    console.log(regData);

    try {
      const res = await axios.post(`${backendurl}/auth/register`, regData);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="login-bg">
      <div id="login-front">
        <Form>
          <img src={logo} className="logo" alt="" />
          <Form.Group className="m-3" controlId="UID">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="User ID"
              name="uid"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="m-3" controlId="UID">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="m-3" controlId="pass">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Button className="m-3" variant="primary" onClick={register}>
            Register
          </Button>
          <span>
            Already Registered ? <Link to="/login">Login</Link>
          </span>
        </Form>
      </div>
    </div>
  );
};

export default Register;
