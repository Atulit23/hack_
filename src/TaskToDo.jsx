import React, {useState} from 'react'
import TaskModal from './TaskModal'
import axios from 'axios'

export default function TaskToDo({tasks}) {
  console.log(tasks)
  const [show, setShow] = useState(false)
  const [userid, setUserID] = useState('')
  const [msg, setMsg] = useState('')
  const [url, setURL] = useState('')
  const [task, setTask] = useState('')

  return (
    <main>
       { 
        tasks.tasks.map((item, index) => (
            <>
              <div className="task">
                <p onClick={async () =>{
                  setShow(!show)
                  setUserID(tasks.email)
                  setTask(item)
                axios.post('http://localhost:8001/submit', {email: tasks.email, files: '', message: '', task: item})
                }}>{item}</p>
               </div>
            </>
            ))
        }
      {show == true && <div className='task__modal'>
        <div className="task__modal__header">
            <p>Submit task</p>
            <button onClick={() => setShow(!show)}>Cross</button>
        </div>
        <p>Your ID: {userid}</p>

        <div className="message__area">
            <p>Message</p>
            <textarea name="" id="" cols="30" rows="10" className='message' placeholder='Enter the message you want to send (optional)...' onChange={(e) => {
                setMsg(e.target.value)
            }}></textarea>
        </div>
        <div className="upload__files">
            <p>Upload files</p>
            <input type="file" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps" onChange={async e => {
              let date = new Date();
              const url = e.target.files[0];
              const formData = new FormData();
              formData.append('file', e.target.files[0]);
              formData.append('upload_preset', 'nb6tvi1b');

              axios
                .post(
                  'https://api.cloudinary.com/v1_1/ddvajyjou/image/upload',
                  formData
                )
                .then(async response => {
                  console.log(response.data.secure_url);
                  setURL(response.data.secure_url)
                });
			}}/>
        </div>
        <button onClick={async () => {
            axios.put('http://localhost:8001/submit', {email: userid, files: url, message: msg, task: task})
        }}>Submit</button>
    </div>
    }
    </main>
  )
}
