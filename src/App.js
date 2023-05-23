import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Tasks from './Tasks';
import TeamDetails from './TeamDetails';
import Submission from './Submission';
import MentalHealth from './MentalHealth';
import { store } from './redux/store';
import Sidebar from './Sidebar';
import Chatbot from './Chatbot';
import Chat from './Chat';
import Meetings from './Meetings';

function App() {
  return (
    <div className="App" style={{height: '100vh', background: '#f5f5f5'}}>
      {store.getState().msgs[0].loggedIn == true && <Navbar />}
      <Router>
      {store.getState().msgs[0].loggedIn == true && <Chatbot />}
        <div style={{display:'flex', height:'92%'}}>
          {store.getState().msgs[0].loggedIn == true && <Sidebar />}
            <Routes>
              <Route path='/' element={<Signup />}/>
                <Route path='/home' element={<Home />}/>
                <Route path='/tasks' element={<Tasks />}/>
                <Route path='/teamdetails' element={<TeamDetails />}/>
                <Route path='/submissions' element={<Submission />}/>
                <Route path='/mentalhealth' element={<MentalHealth />}/>
                <Route path='/chat' element={<Chat />}/>
                <Route path='/meetings' element={<Meetings />}/>
            </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
