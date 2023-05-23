import React, { useState, useEffect } from 'react'
import { store } from './redux/store'
import Signup from './Signup'
import axios from 'axios'
import AboutCurrentUser from './AboutCurrentUser'
import TaskToDo from './TaskToDo'
import { Link } from 'react-router-dom'
import Chatbot from './Chatbot'

export default function Tasks() {
    const [data, setData] = useState([])
    const [taskData, setTaskData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8001/tasks').then((res) => {
            setData(res.data)
        })
    }, [])

    console.log(data)

    useEffect(() => {
        data?.map((item, index) => {
            if(item.email == store.getState().msgs[0].email && item.organization == store.getState().msgs[0].organization){
                setTaskData(item)
                console.log(taskData)
            }
        })
    }, [data])
    return (
        <>
        
        {store.getState().msgs[0].role == 'admin' && <Link to='/teamdetails' className="assginTask">Assign task</Link>}
        {store.getState().msgs[0].loggedIn == true ? <div className='tasks'>
            <AboutCurrentUser />
            <div className="tasks__main">
                <div className="tasks__header">
                    <p>Your tasks</p>
                </div>
                <div className="tasks_display">
                    {
                        taskData.length == 0 ? <div><p>Congrats, no tasks for you.</p></div> : <TaskToDo tasks={taskData}/>
                    }
                </div>
            </div>
        </div> : <Signup />}
        </>
        
    )
}
