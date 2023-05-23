import React from 'react'
import { store } from './redux/store'

export default function Navbar() {
  return (
    <div className="navbar__main" style={{height: '8vh', background: 'white'}}>
      <div className="nav__sub">
        <p className='logo'>MetaMeet</p>
        <div className="navbar__elements">
          {/* <button onClick={() => {
            store.dispatch({
              type: 'ADD_MSG',
              text: {loggedIn: false, email: '', role: '', organization:'', team: '', name: ''}
            })
            window.location.reload()
          }}>Logout</button> */}
          <input type="text" placeholder='Search'/>
        </div>
      </div>
      
    </div>
  )
}
