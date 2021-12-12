import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import logo from "../assets/OotaBaseLogo1.png";
import { useState } from "react";
import axios from "axios";
import { backendurl } from "../url/backendurl";

const Login = () => {
  const [logData, setLogData] = useState({
    username: "",
    password: "",
    job: "",
  });

  const handleChange = (e) => {
    setLogData({ ...logData, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${backendurl}/auth/login`, logData);
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
          <Form.Select
            className="m-3 class-select"
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
          <Button className="m-3" variant="primary" onClick={login}>
            Login
          </Button>
          <span>
            Haven't Registered ? <Link to="/register">Register</Link>
          </span>
        </Form>
      </div>
    </div>
  );
};

export default Login;
