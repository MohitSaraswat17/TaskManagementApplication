import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Button,Modal,Stack} from 'react-bootstrap'
import toast from 'react-hot-toast';


const ViewTaskModel = ({handleViewModelClose,showViewModel,id}) => {

  const [task,setTask] = useState([]);
  useEffect(()=>{
    const singleTask = async()=>{
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/task/single/${id}`,{withCredentials:true}).then(res=>{
        setTask(res.data.task);
      }).catch(error=>{
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      })
    }
    if(id){
      singleTask();
    }
  },[id]);


  return (
    <>
    <Modal show={showViewModel} onHide={handleViewModelClose}>
      <Modal.Header closeButton>
          <Modal.Title>View Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack>
          <p className='fw-bold mb-0'>Title</p>
          <p>{task && task.title}</p>
        </Stack>
        <Stack>
          <p className='fw-bold mb-0'>Description</p>
          <p>{task && task.description}</p>
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleViewModelClose}>Close</Button>
      </Modal.Footer>
      </Modal>
    </>
  )
}

export default ViewTaskModel