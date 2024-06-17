import React from 'react'
import { useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Navigate } from 'react-router-dom';


const Register = ({setIsAuthenticated,isAuthenticated}) => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");
  const [avatar,setAvatar] = useState("");

  const avatarhandler =(e)=>{
    const file = e.target.files[0];
    setAvatar(file);
  }

  const handleRegister = async (e)=>{
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name",name);
    formdata.append("email",email);
    formdata.append("phone",phone);
    formdata.append("password",password);
    formdata.append("avatar",avatar);
    
    await axios.post("http://localhost:2000/api/v1/user/register",formdata,{
      withCredentials:true,
      headers:{
        "Content-Type":"multipart/form-data"
      }
    }).then(res=>{
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setAvatar("");
      setIsAuthenticated(true);
      toast.success(res.data.message);
      
    }).catch(error=>{
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    
    })
  }

  if(isAuthenticated){
    return <Navigate to="/"/>
  }


  return (
    
    <Container className="d-flex justify-content-center align-items-center flex-column"
    style={{minHeight:"800px"}}>
  
    <h1 style={{textAlign:"center", marginBottom:"30px", color:"#ffc107", fontSize:"4em"}}>TASK SYNC</h1>
    
    <div style={{border: "2px solid #ffc107", padding: "40px", borderRadius: "5px",marginBottom:"30px",width:"40%"}}>
    <Form onSubmit={handleRegister}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Name" value={name} onChange={(e)=> setName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter Your Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="phone" placeholder="Enter Your Phone No." value={phone} onChange={(e)=> setPhone(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Your Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Avatar</Form.Label>
        <Form.Control type="file" onChange={avatarhandler} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Already Registered ?<Link to={"/login"} className="text-decoration-none" > Login</Link></Form.Label>

      </Form.Group>
       
      <Button variant="warning" type="submit" className="w-100 text-light fw-bold fs-5 ">
        Register
      </Button>
    </Form>
    </div>
    </Container>
  )
}

export default Register