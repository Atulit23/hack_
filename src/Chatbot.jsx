import React, {useState} from 'react'
import {Link} from "react-router-dom";

export default function Chatbot() {
  const [value, setValue] = useState('')
  const options = ['assigned tasks', 'team details', 'submissions', 'mental health assessment']
  const [responses, setResponses] = useState([])

  return (
    <main>
        <div className="chatbot__main" style={{zIndex: '10'}}>
        <div className="chatbot__title">
              <p>Your Assistant</p>
            </div>
          <div className="chatbot__sub">
            <div className="chatbot__content">
              <div className="chatbot__options">
                <p>Hi. How can I help you today?</p>
                <p>Assigned tasks</p>
                <p>Team details</p>
                <p>Submissions</p>
                <p>Mental Health Assessment</p>
                {responses.map((item, index) => (
                    item.type == 'text' ? <div style={item.from == 'human' ? {width: '100%', display: 'flex', justifyContent: 'flex-end'} : {width: '100%', display: 'flex', justifyContent: 'flex-start'}}><p style={item.from == 'human' ? {background: 'white'} : {background: 'e8e8e8'}}>{item.response}</p></div> : <div style={item.from == 'human' ? {width: '100%', display: 'flex', justifyContent: 'flex-end'} : {width: '100%', display: 'flex', justifyContent: 'flex-start'}}><Link to={item.link} style={item.from == 'human' ? {background: 'white'} : {background: 'e8e8e8'}}>{item.response}</Link></div>
                ))}
              </div>
            </div>
          </div>
          <form action="submit" onSubmit={(e) => {
            e.preventDefault()
            if(options.includes(value.toLocaleLowerCase()) == true){
              if(value.toLocaleLowerCase() == 'assigned tasks'){
                setResponses(responses => [...responses, {from:'human', response: 'assigned tasks', type: 'text'}])
                setResponses(responses => [...responses, {from:'bot', response: 'Click here to view the task', type: 'link', link: '/tasks'}])
              }
              if(value.toLocaleLowerCase() == 'team details'){
                setResponses(responses => [...responses, {from:'human', response: 'team details', type: 'text'}])
                setResponses(responses => [...responses, {from:'bot', response: 'Click here to view the team details', type: 'link', link: '/teamdetails'}])
              }
              if(value.toLocaleLowerCase() == 'submissions'){
                setResponses(responses => [...responses, {from:'human', response: 'submissions', type: 'text'}])
                setResponses(responses => [...responses, {from:'bot', response: 'Click here to view about submissions', type: 'link', link: '/submissions'}])
              }
              if(value.toLocaleLowerCase() == 'mental health assessment'){
                setResponses(responses => [...responses, {from:'human', response: 'mental health assessment', type: 'text'}])
                setResponses(responses => [...responses, {from:'bot', response: 'Click here to view about mental health assessment', type: 'link', link: 'mentalhealth'}])
              }
            } else {
              setResponses(responses => [...responses, {from:'human', response: value, type: 'text'}])
              setResponses(responses => [...responses, {from:'bot', response: "Sorry, what was that?", type: 'text'}])
            }
            setValue('')
          }}>
          <input type="text" value={value} placeholder='Enter the choice' onChange={(e) => {
            setValue(e.target.value)
          }}/>
          </form>
        </div>
    </main>
  )
}
