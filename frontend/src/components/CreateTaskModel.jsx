import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Button,Modal,Stack} from 'react-bootstrap'
import toast from 'react-hot-toast';


const CreateTaskModel = ({showCreateModel,handleCreateModelClose,setTasks}) => {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  const handleCreateTask = async()=>{
    await axios.post(`http://localhost:2000/api/v1/task/post`,{
      title,
      description,
    },
    {withCredentials:true,
      headers:{
        "Content-Type":"application/json"
      }
    }).then(res=>{
      toast.success(res.data.message);
      setTasks(prevTasks=>[...prevTasks,res.data.task]);
      setTitle("");
      setDescription("");
      
      handleCreateModelClose();

    }).catch(error=>{
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
    )
  }


  return (
    <>  
    <Modal show={showCreateModel} onHide={handleCreateModelClose}>
      <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={3}>
          <label>Title</label>
          <input type="text" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)} />
        </Stack>
        <br />
        <Stack gap={3}>
          <label>Description</label>
          <input type="text" className="form-control" value={description} onChange={(e)=>setDescription(e.target.value)} />
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCreateModelClose}>Close</Button>
        <Button variant='primary' onClick={handleCreateTask}>Create</Button>
      </Modal.Footer>
      </Modal>
    </>
  )
}



export default CreateTaskModel