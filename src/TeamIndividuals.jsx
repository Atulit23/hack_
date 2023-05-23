import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { store } from './redux/store'

export default function TeamIndividuals() {
    const [assign, setAssign] = useState(false)
    const [userid, setUserID] = useState('')
    const [name, setName] = useState('')
    const [team_, setTeam_] = useState('')
    const [value, setValue] = useState('')
    const [prevTasks, setPrevTasks] = useState([])
    let [d, setD] = useState([])
    const [data, setData] = useState([])
    const [team, setTeam] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8001/tasks').then((res) => {
            setData(res.data)
        })
    }, [])

    console.log(data)

    data.map((item, index) => {
        if(item.team == store.getState().msgs[0].team && item.organization == store.getState().msgs[0].organization){
          team[index] = item
        }
      })

    data.map((item, index) => {
        if(item.email == userid){
            d = item.tasks
        }
    })

    console.log(d)

  return (
    <div className='team__individual'>
        {
            team.map((item, index) => (
                <div className="team__member__current">
                    <img src="https://h-o-m-e.org/wp-content/uploads/2022/04/Blank-Profile-Picture-1.jpg" alt="" />
                    <p>{item.name}</p>
                    {(store.getState().msgs[0].role == 'admin' && store.getState().msgs[0].email != item.email) && <button onClick={() => {
                        setUserID(item.email)
                        setName(item.name)
                        setTeam_(item.team)
                        setAssign(!assign)
                    }}>Assign task</button>}
                </div>
            ))
        }
       { 
            assign == true && <div className="assign__task__modal">
                <div className="assign__header">
                    <p>Assign task</p>
                    <button onClick={() => {setAssign(!assign)}}>Cross</button>
                </div>
                <div className="assigning__elements">
                    <div>
                        <p className="assigning__to">Assigning to: {name}</p>
                        <p className="assignee__team">Team: {team_}</p>
                        <textarea name="" id="" cols="30" rows="10" className="assignement" placeholder='Enter the task here...' onChange={(e) => setValue(e.target.value)}></textarea>
                    </div>
                    <div className="assignement__button">
                        <button onClick={async() => {
                            d.push(value)
                            axios.put('http://localhost:8001/tasks', {email: userid, tasks: d})
                            alert('Task assigned')
                            setAssign(!assign)
                        }}>Assign</button>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}
