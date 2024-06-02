import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Button,Modal,Stack} from 'react-bootstrap'
import toast from 'react-hot-toast';


const UpdateTaskModel = ({showUpdateModel,handleUpdateModelClose,id,setTasks}) => {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [status,setStatus] = useState("incomplete");
  const [archived,setArchived] = useState(false);

  useEffect(()=>{
    const singleTask = async()=>{
      await axios.get(`http://localhost:4000/api/v1/task/single/${id}`,{withCredentials:true}).then(res=>{
        setTitle(res.data.task.title);
        setDescription(res.data.task.description);
        setStatus(res.data.task.status);
        setArchived(res.data.task.archived);
      }).catch(error=>{
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      })
    }
    if(id){
      singleTask();
    }
  },[id]);

  const handleUpdate = async()=>{
    await axios.put(`http://localhost:4000/api/v1/task/update/${id}`,{
      title,
      description,
      status,
      archived
    },
    {withCredentials:true}).then(res=>{
      toast.success(res.data.message);
      setTasks(prevTasks=>{
        const updatedTasks= prevTasks.map(task=>{
          if(task._id===id){
            return {
              ...task,title,description,status,archived
            };
          }else{
            return task;
          }
        })
        return updatedTasks;
      })
      handleUpdateModelClose();

    }).catch(error=>{
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
    )
  }


  return (
    <>  
    <Modal show={showUpdateModel} onHide={handleUpdateModelClose}>
      <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={2}>
          <label>Title</label>
          <input type="text" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)} />
        </Stack>
        <br />
        <Stack gap={2}>
          <label>Description</label>
          <input type="text" className="form-control" value={description} onChange={(e)=>setDescription(e.target.value)} />
        </Stack>
        <br />
        <Stack gap={2}>
          <label>Status</label>
          <select value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </Stack>
        <br />
        <Stack gap={2}>
          <label>Archived</label>
          <select value={archived} onChange={(e)=>setArchived(e.target.value)}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </Stack>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleUpdateModelClose}>Close</Button>
        <Button variant='primary' onClick={handleUpdate}>Update</Button>
      </Modal.Footer>
      </Modal>
    </>
  )
}



export default UpdateTaskModel