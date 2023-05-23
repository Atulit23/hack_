import React from 'react'
import axios from 'axios'
import { store } from './redux/store'

export default function AboutCurrentUser() {
  return (
    <div className='about'>
        <div className="about__main">
            <img src="https://h-o-m-e.org/wp-content/uploads/2022/04/Blank-Profile-Picture-1.jpg" alt="" className="user__image" />
            <div className="user__details">
                <p>Name: {store.getState().msgs[0].name}</p>
                <p>UserID: {store.getState().msgs[0].email}</p>
                <p>Organization: {store.getState().msgs[0].organization}</p>
                <p>Team: {store.getState().msgs[0].team}</p>
                <p>Role: {store.getState().msgs[0].role}</p>
            </div>
        </div>
    </div>
  )
}
