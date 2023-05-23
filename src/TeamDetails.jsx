import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { store } from './redux/store'
import TeamIndividuals from './TeamIndividuals'
import Signup from './Signup'
import Chatbot from './Chatbot'

export default function TeamDetails() {
  return (
    <>
      {store.getState().msgs[0].loggedIn == true ? <div className="team__details__main"> 
          <div className='team__details__header'>
            <p>Your team</p>
          </div>
          <div className="team__individuals">
            <TeamIndividuals />
          </div>
      </div> : <Signup />}
    </>
    
    
  )
}
