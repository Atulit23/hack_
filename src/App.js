import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <div className="App" style={{height: '100vh'}}>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<Signup />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/home' element={<Home />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
