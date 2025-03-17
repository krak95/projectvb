import './App.css';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Production from './Components/Production/Production';
import MySQLController from './Components/MySQLController/MySQLController';
import PQA from './Components/PQA/PQA';
import axios from 'axios';
import { useEffect } from 'react';
import { getALLProductionAXIOS, getALLUsersAXIOS } from './API/Axios/axiosCS';
import LiveCamera from './Components/LiveCamera/LiveCamera';
import CameraStream from './Components/LiveCamera/RTSCcamera';

function App() {

  useEffect(() => {
    getALLUsersAXIOS()
    .then(result => console.log(result))
  }, [])

  return (
    <>
    {/* <LiveCamera/> */}
    {/* <CameraStream/> */}
      <Router>
        <div className='mainNavDiv'>
          <nav className='mainNav'>
            <NavLink to="">Home1</NavLink>
            <NavLink to="Production">Production</NavLink>
            <NavLink to="PQA">PQA</NavLink>
            <NavLink to="MySQLController">MySQLController</NavLink>
          </nav>
        </div>
        <div className='mainPage'>
          <Routes>
            <Route path='/Production/*' element={<Production />}></Route>
            <Route path='/PQA' element={<PQA />}></Route>
            <Route path='/MySQLController' element={<MySQLController />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;