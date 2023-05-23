import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Chatbot from './Chatbot'
import Signup from './Signup'
import { store } from './redux/store'
import { Link } from 'react-router-dom'

export default function Submission() {
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [id, setID] = useState('')
  const [task, setTask] = useState('')
  const [file, setFile] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8001/submit').then(res => {
      setData(res.data)
    })
  }, [])
  return (
    <>
    {store.getState().msgs[0].loggedIn == true ? <div className='submission'>
      <div className="submisions__header">
        <p>Your submissions</p>
      </div>
      <div className="submitted__tasks">
        {
          data.map((item, index) => (
            (item.email == store.getState().msgs[0].email && item.task != '') && <div className="particular__task" onClick={() => {
              setShow(!show)
              setID(item.email)
              setTask(item.task)
              setFile(item.files)
              }}>
              <p>{item.task}</p>
            </div>
          ))
        }
      </div>
      {show == true && <div className="submission__modal">
        <div className="submission__modal__header">
          <p>About submission</p>
          <button onClick={() => setShow(!show)}>Close</button>
        </div>
        <p>UserID: {id}</p>
        <p>Task: {task}</p>
        <Link to={file}>Click here to view your file</Link>
        </div>}
      </div> : <Signup />}
    </>
    
  )
}
