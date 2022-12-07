import { Link, useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import logo from "../assets/OotaBaseLogo.png";
import { useState } from "react";
import axios from "axios";
import { backendurl } from "../url/backendurl";
import { toast } from "react-hot-toast";

const Login = () => {
  const [logData, setLogData] = useState({
    username: "",
    password: "",
    job: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    setLogData({ ...logData, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendurl}/auth/login`, logData);
      let userObj = {
        name: data.name,
        job: logData.job,
        uid: data.uid,
      };
      if (logData.job === "admin" && data !== "Not Authorized") {
        localStorage.setItem("token", JSON.stringify(userObj));
        history.push("/admin");
      } else if (logData.job === "waiter" && data !== "Not Authorized") {
        localStorage.setItem("token", JSON.stringify(userObj));
        history.push("/booktable");
      } else if (logData.job === "kitchen" && data !== "Not Authorized") {
        localStorage.setItem("token", JSON.stringify(userObj));
        history.push("/kitchen");
      } else {
        toast.error("Login Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id='login-bg'>
      <div id='login-front' className='shadow'>
        <Form>
          <img src={logo} className='logo' alt='' />
          <h1 style={{ textDecoration: "underline" }}>Log In</h1>
          <Form.Group className='m-3' controlId='UID'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              className='shadow'
              type='text'
              placeholder='Username'
              name='username'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='m-3' controlId='pass'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              className='shadow'
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Select
            className='m-3 class-select shadow'
            aria-label='Job'
            name='job'
            onChange={handleChange}
          >
            <option selected disabled>
              Job
            </option>
            <option value='waiter'>Waiter</option>
            <option value='kitchen'>Kitchen</option>
            <option value='admin'>Admin</option>
          </Form.Select>
          <Button className='bt1 shadow' variant='primary' onClick={login}>
            Login
          </Button>
          <p style={{ padding: "3vh" }}>
            Haven't Registered ? <Link to='/register'>Register</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
