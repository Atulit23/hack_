import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Admin from './Admin'
import Employee from './Employee'

export default function Home() {
    const [data, setData] = useState([])
    if(localStorage.getItem('type') == 'signup'){
          useEffect(() => {
            axios.put('http://localhost:8001/signup', {email: localStorage.getItem('signEmail')}).then((res) => {
                setData(res.data)
            })
        }, [])
    } else if(localStorage.getItem('type') == 'login') {
        useEffect(() => {
            axios.put('http://localhost:8001/signup', {email: localStorage.getItem('loginEmail')}).then((res) => {
                setData(res.data)
            })
        }, [])
    }
  return (
    <>
        {
            data.role == 'Admin' ? <Admin /> : <Employee />
        }
    </>
  )
}
