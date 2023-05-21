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

export default function Signup() {
  const [show, setShow] = useState(false)
  const [firstname, setFisrtName] = useState('')
  const [secondname, setSecondName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden hei'>

    <MDBRow>

      <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

        <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
          The best offer <br />
          <span style={{color: 'hsl(218, 81%, 75%)'}}>for your business</span>
        </h1>

        <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eveniet, itaque accusantium odio, soluta, corrupti aliquam
          quibusdam tempora at cupiditate quis eum maiores libero
          veritatis? Dicta facilis sint aliquid ipsum atque?
        </p>

      </MDBCol>

      <MDBCol md='6' className='position-relative c'>

        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

        <MDBCard className='my-5 bg-glass size'>
          <MDBCardBody className='p-5'>

            <MDBRow>
              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' onChange={(e) => {
                  setFisrtName(e.target.value)
                }}/>
              </MDBCol>

              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text' onChange={(e) => {
                  setSecondName(e.target.value)
                }}/>
              </MDBCol>
            </MDBRow>

            <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' onChange={(e) => {
              setEmail(e.target.value)
            }}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' onChange={(e) => {
              setPassword(e.target.value)
            }}/>
            <div className="btn-group" style={{marginBottom: '1.4rem'}}>
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
            </div>

            <MDBBtn className='w-100 mb-4' size='md' onClick={async () => {
              if (email != '' && password != '') {
                axios.post('http://localhost:8001/signup', { email: email, password: password, firstname: firstname, lastname: secondname, role: role })
                axios.post('http://localhost:8001/login', { email: email, password: password})
                  .then(res => {
                    setMessage(res.data.message)
    
                    if (res.data.message == 'successful') {
                      window.location.href = '/home'
                    }
                  })
              }
              localStorage.setItem('signEmail', email)
              localStorage.setItem('type', 'signup')
            }}>Sign up</MDBBtn>

            <div className="text-center">
              <Link to='/login'><p>Already have an account? Login.</p></Link>

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

    {message == 'User already exist' &&
        <div className="message__main">
          <div className="misc">
            <p className="login__message">User already exists</p>
            <svg aria-label="Close" color="black" fill="black" height="18" role="img" viewBox="0 0 48 48" width="18" className='cross' onClick={() => {
              document.querySelector('.message__main').setAttribute('class', 'message__main__secondary')
              setTimeout(function () {
                setMessage('')
              }, 600)
            }}><title>Close</title><path clip-rule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg>
          </div>

        </div>
      }

  </MDBContainer>
  )
}
