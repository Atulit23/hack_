import React from 'react'
import { Link } from 'react-router-dom'
import { store } from './redux/store'

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebar__elements">
        <Link to='/'>Dashboard</Link>
        <Link to='/teamdetails'>Team details</Link>
        <Link to='/submissions'>Submissions</Link>
        <Link to='/tasks'>Assigned tasks</Link>
        <Link to='/chat'>Chat</Link>
        <Link to='/mentalhealth'>Mental Health</Link>
        <Link to='/meetings'>Meetings</Link>
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_MSG',
            text: {loggedIn: false, email: '', role: '', organization:'', team: '', name: ''}
          })
          window.location.reload()
        }}>Logout</button>
      </div>
    </div>
  )
}
