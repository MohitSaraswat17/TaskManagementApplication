import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate,Link } from 'react-router-dom';
import {Card,Button,Stack,Container,Row,Col} from 'react-bootstrap/esm';
import {MdEdit, MdDelete} from 'react-icons/md';
import {FaEye} from 'react-icons/fa';
import CreateTaskModel from '../components/CreateTaskModel';
import UpdateTaskModel from '../components/UpdateTaskModel';
import ViewTaskModel from '../components/ViewTaskModel';

const Home = ({isAuthenticated,tasks,setTasks,taskType}) => {
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [showUpdateModel, setShowUpdateModel]  = useState(false);
  const [showViewModel, setShowViewModel] = useState(false);
  const [viewTaskId,setViewTaskId] = useState("");
  const [updateTaskId,setUpdateTaskId] = useState("");

  const deleteTask = async (id) => { 
    await axios.delete(`${import.meta.env.VITE_VITE_BACKEND_URL}/api/v1/task/delete/${id}`,{withCredentials:true})
    .then((res)=>{
      toast.success(res.data.message);
      setTasks((prevTasks)=>prevTasks.filter((task)=>task._id!==id));
    }).catch((error)=>{
      toast.error(error.response.data.message);
    
    });

  };
  
  const handleCreateModelClose= ()=> setShowCreateModel(false);
  const handleUpdateModelClose= ()=> setShowUpdateModel(false);
  const handleViewModelClose= ()=> setShowViewModel(false);


  const handleCreateModelShow=()=> setShowCreateModel(true);
  const handleUpdateModelShow=(id)=> {
    setUpdateTaskId(id);
    setShowUpdateModel(true);
  };
  const handleViewModelShow=(id)=> {
    setViewTaskId(id);
    setShowViewModel(true);
  };

  if(!isAuthenticated){
    return <Navigate to="/login"/>
  } 
  return (
    <div className="bg-light min-vh-100 py-4">
    <Container className="my-4">
      <Row className="mb-3 d-flex align-items-center">
        <Col>
          <h1 className="display-4 text-dark fw-bold">{taskType}</h1>
        </Col>
        <Col className="text-end">
          <Button variant="warning" className='mx-2 fs-5' onClick={handleCreateModelShow}>CREATE TASK</Button>
        </Col>
      </Row>
      <br />
      <br/>
      <Row>
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <Col key={task._id} lg={3} md={4} sm={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Stack gap={2}>
                    <Card.Title className="mb-2" style={{ height: "50px" }}>
                      {task && task.title.length <= 40 ? task.title : task.title.slice(0, 40) + "..."}
                    </Card.Title>
                    <Card.Text>
                      {task && task.description.length <= 300 ? task.description : task.description.slice(0, 300) + "..."}
                    </Card.Text>
                  </Stack>
                  <Stack direction="horizontal" gap={2} className="justify-content-end mt-auto">
                    <MdEdit className="fs-3 text-primary" onClick={() => handleUpdateModelShow(task._id)} />
                    <MdDelete className="fs-3 text-danger" onClick={() => deleteTask(task._id)} />
                    <FaEye className="fs-3 text-info" onClick={() => handleViewModelShow(task._id)} />
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h1 className="text-center w-100">No Tasks Found for {taskType}</h1>
        )}
      </Row>
      <CreateTaskModel
        handleCreateModelClose={handleCreateModelClose}
        showCreateModel={showCreateModel}
        setTasks={setTasks}
      />
      <UpdateTaskModel
        showUpdateModel={showUpdateModel}
        handleUpdateModelClose={handleUpdateModelClose}
        id={updateTaskId}
        setTasks={setTasks}
      />
      <ViewTaskModel
        showViewModel={showViewModel}
        handleViewModelClose={handleViewModelClose}
        id={viewTaskId}
      />
    </Container>
  </div>
  )
}

export default Home