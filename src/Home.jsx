import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Admin from './Admin'
import Employee from './Employee'
import Chatbot from './Chatbot'
import { store } from './redux/store';

export default function Home({userData}) {
    console.log(userData)
  return (
    <>
        {
            store.getState().msgs[0].role == 'admin' ? <Admin /> : <Employee />
        }
    </>
  )
}
