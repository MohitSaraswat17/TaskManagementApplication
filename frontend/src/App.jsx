import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './components/Home'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import {Toaster} from 'react-hot-toast'
import axios from 'axios'
const App = () => {

  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const [tasks,setTasks] = useState([]);
  const [user,setUser] = useState({});
  const [taskType,setTaskType] = useState("Tasks");

  useEffect(()=>{
    const handleGetUser =  async()=>{
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`,{withCredentials:true});
        setIsAuthenticated(true);
        setUser(data.user);
      } catch (error) {
        console.log("User is not Authenticated");
        setIsAuthenticated(false);
      setUser({});
      }
      
    };
    handleGetUser(); 
  },[isAuthenticated])
    
  return (
   <Router> 
   <Header setTasks={setTasks} tasks={tasks} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} setTaskType={setTaskType} />
      <Routes>

       <Route path="/" element={<Home isAuthenticated={isAuthenticated} tasks={tasks} setTasks={setTasks} taskType={taskType}/>}/>
       <Route path="/login" element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
       <Route path="/register" element={<Register isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
       <Route path="/profile" element={<Profile user={user} isAuthenticated={isAuthenticated}/>}/>

      </Routes>
      <Toaster/>
   </Router>
  )
}

export default App