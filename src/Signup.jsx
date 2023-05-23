import React, {useState, useEffect} from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
  from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Home from './Home';
import { store } from './redux/store';

export default function Signup() {
  const [organization, setOrganization] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [userData, setUserData] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  // localStorage.setItem('loggedIn', 'false')
  // localStorage.clear()


  return (
    store.getState().msgs[0].loggedIn == false ? <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden hei'>

    <MDBRow style={{width: '80%'}}>

      <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

        <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
          MetaMeet<br />
          <span style={{color: 'hsl(218, 81%, 75%)'}}>MetaMeet</span>
        </h1>

        <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eveniet, itaque accusantium odio, soluta, corrupti aliquam
          quibusdam tempora at cupiditate quis eum maiores libero
          veritatis? Dicta facilis sint aliquid ipsum atque?
        </p>

      </MDBCol>

      <MDBCol md='6' className='position-relative c'>


        <MDBCard className='my-5 bg-glass size'>
          <MDBCardBody className='p-5'>
          <p className='login__header'>Login</p>

            <MDBInput wrapperClass='mb-4' label='Your Organization' id='form3' type='text' onChange={(e) => {
                setOrganization(e.target.value)
              }}/>
            <MDBInput wrapperClass='mb-4' label='User ID' id='form3' type='text' onChange={(e) => {
              setEmail(e.target.value)
            }}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' onChange={(e) => {
              setPassword(e.target.value)
            }}/>
            {/* <div className="btn-group" style={{marginBottom: '1.4rem'}}>
              <button type="button" className="btn btn-primary">You are</button>
              <button
                type="button"
                className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
                id="dLabel" 
               onClick={() => setShow(!show)}>
                <span className="visually-hidden" >Toggle Dropdown</span>
              </button>
              <ul className={`dropdown-menu ${show == true ? 'show' : 'hide'}`} aria-labelledby="dLabel">
                <li className="dropdown-item" href="#" onClick={() => {
                  setRole('Admin')
                  setShow(!show)
                  }}>Admin</li>
                <li className="dropdown-item" href="#" onClick={() => {
                  setRole('Employee')
                  setShow(!show)
                  }}>Employee</li>
              </ul>
            </div> */}

            <MDBBtn className='w-100 mb-4' size='md' onClick={async () => {
              if (email != '' && password != '') {
                axios.put('http://localhost:8001/signup', { email: email, password: password, organization: organization })
                  .then(res => {
                    setMessage(res.data.message)
                    console.log(res.data.message)
                    if (res.data.message == 'login success') {
                      store.dispatch({
                        type: 'ADD_MSG',
                        text: {loggedIn: true, email: res.data.user.email, role: res.data.user.role, organization: res.data.user.organization, team: res.data.user.Team, name: res.data.user.name}
                      })
                      console.log(store.getState().msgs[0])
                      axios.post('http://localhost:8001/tasks', {email: store.getState().msgs[0].email, role: store.getState().msgs[0].role, organization: store.getState().msgs[0].organization, team:store.getState().msgs[0].team, tasks: [], name:  store.getState().msgs[0].name})

                      axios.post('http://localhost:8001/submit', {email: store.getState().msgs[0].email, files: '', message: '', task: ''})
                      window.location.reload()
                    }
                    console.log(res.data.message)
                  })
                  localStorage.setItem('type', 'login')
              }
            }}>Login</MDBBtn>

            <div className="text-center">

              {/* <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn> */}

            </div>

          </MDBCardBody>
        </MDBCard>

      </MDBCol>

    </MDBRow>

    {message == 'wrong credentials' &&
        <div className="message__main">
          <div className="misc">
            <p className="login__message">Invalid Credentials</p>
            <svg aria-label="Close" color="black" fill="blzack" height="18" role="img" viewBox="0 0 48 48" width="18" className='cross' onClick={() => {
              document.querySelector('.message__main').setAttribute('class', 'message__main__secondary')
              setTimeout(function () {
                setMessage('')
              }, 600)
            }}><title>Close</title><path clip-rule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg>
          </div>

        </div>
      }

  </MDBContainer> : <Home userData={userData}/>
  )
}
