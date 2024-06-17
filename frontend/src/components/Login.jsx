import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { Link, Navigate } from 'react-router-dom';

const Login = ({setIsAuthenticated,isAuthenticated}) => {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");


  const handleLogin = async(e) => {
    e.preventDefault();
    await axios
    .post("http://localhost:2000/api/v1/user/login",
    {email,password},
    {withCredentials:true,
    headers:{"Content-Type":"application/json"}}
  ).then(res=>{
    setEmail("");
    setPassword("");
    setIsAuthenticated(true);
    toast.success(res.data.message);
  }).catch(error=>{
    console.log(error.response.data.message);
    toast.error(error.response.data.message);
  });
    
  };
  if(isAuthenticated){
    return <Navigate to="/"/>
  }

  return (
    <Container
    className="d-flex justify-content-center align-items-center flex-column"
    style={{ minHeight: "800px" }}
  >
    <h1
      style={{
        textAlign: "center",
        marginBottom: "30px",
        color: "#ffc107",
        fontSize: "4em",
        position: "absolute",
        top: "50px",
      }}
    >
      TASK SYNC
    </h1>

    <div
      style={{
        border: "2px solid #ffc107",
        padding: "40px",
        borderRadius: "5px",
        marginBottom: "30px",
        width: "40%",
      }}
    >
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Not Registered ?<Link to={"/register"} className="text-decoration-none"> Register</Link>
          </Form.Label>
        </Form.Group>

        <Button
          variant="warning"
          type="submit"
          className="w-100 text-light fw-bold fs-5"
        >
          Login
        </Button>
      </Form>
    </div>
  </Container>
  )
}

export default Login