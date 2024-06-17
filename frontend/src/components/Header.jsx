import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/esm/Button";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect,useState } from "react";



function Header({setTasks,tasks,setIsAuthenticated,isAuthenticated,setTaskType}) {
  const [alltasks,setAllTasks] = useState([]);
  const navigateTo = useNavigate();

  useEffect(()=>{
    fetchTask();
  },[isAuthenticated])

  const fetchTask = async() => { 
    try {
      const {data} = await axios.get("http://localhost:2000/api/v1/task/mytask",{withCredentials:true});
      setAllTasks(data.tasks);
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error in fetching tasks",error);
    }
  };

  
const HandleLogout = async() => { 
    try {
      const {data} = await axios.get("http://localhost:2000/api/v1/user/logout",{withCredentials:true});
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }


  const filterTasks = (filtertype) => {
    let filterTasks = [];
    switch (filtertype) {
      case "completed":
        filterTasks = alltasks.filter((task) => task.status === "completed");
        setTaskType("COMPLETED TASKS");
        break;
      case "incomplete":
        filterTasks = alltasks.filter((task) => task.status === "incomplete");
        setTaskType("INCOMPLETED TASKS");
        break;
      case "archived":
        filterTasks = alltasks.filter((task) => task.archived === true);
        setTaskType("ARCHIVED TASKS");
        break;
      case "all":
        filterTasks = alltasks;
        setTaskType("ALL TASKS");
        break;
    
      default:
        filterTasks = alltasks;
        
    }
    setTasks(filterTasks);
  }
  return (
     <Navbar expand="lg" className={`bg-dark ${!isAuthenticated ? "d-none" : ""}`}>
      <Container>
        <Navbar.Brand href="#home" className="fw-bold text-warning">
          TASK-SYNC
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Link to="/" className="nav-link text-light mx-2 fs-5">
              HOME
            </Link>

            <NavDropdown title={<span className="text-light fs-5">FILTER TASKS</span>} id="basic-nav-dropdown" className="mx-2">
              <NavDropdown.Item onClick={() => filterTasks("all")}>All Tasks</NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("completed")}>Completed Tasks</NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("incomplete")}>Incompleted Tasks</NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("archived")}>Archived Tasks</NavDropdown.Item>
            </NavDropdown>

            <Link to="/profile" className="nav-link text-light mx-2 fs-5">
              PROFILE
            </Link>
            <Button variant="danger" className="btn btn-outline-light mx-2 fs-5" onClick={HandleLogout}>
              LOGOUT
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default Header;



