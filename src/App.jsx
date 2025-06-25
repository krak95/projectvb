import './App.css';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Production from './Components/Production/Production';
import MySQLController from './Components/MySQLController/MySQLController';
import PQA from './Components/PQA/PQA';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getCheckLoginAXIOS } from './API/Axios/axiosCS';
import LiveCamera from './Components/LiveCamera/LiveCamera';
import CameraStream from './Components/LiveCamera/RTSCcamera';
import Item from './Components/Item/Item';
import User from './Components/User/User';
import Issues from './Components/PQA/Issues/Issues';
import Authentication from './Components/Authentication/Authentication';
import GlobalContent, { useAuth } from './GLOBAL/Global';
import { ProtectRoutes } from './Components/ProtectedRoutes/ProtectedRoutes';
import { useContext } from 'react';
import { getData } from './CustomHooks/LocalStorage/GetData';
import { setData } from './CustomHooks/LocalStorage/StoreData';
import socket from './API/Socket/socket';

function App() {

  const { authorized } = useAuth()
  const { authorizing } = useContext(GlobalContent);

  const checkLogin = async (e) => {
    console.log(e)
    const storedData = getData()
    console.log(storedData)
    const res = await getCheckLoginAXIOS({ username: storedData.username, token: storedData.token })
    console.log(res.data)
    if ((res.data.length) != 0) {
      authorizing(1)
    } else {
      setData({ username: '', token: '', fullname: '' })
      authorizing(0)
    }
  }

  useEffect(() => {
    socket.on('socketCheckLogin', (data) => {
      console.log(data)
      checkLogin(data)
    })
  }, [])
  useEffect(() => {
    checkLogin()
  }, [])

  console.log()
  return (
    <>
      {/* <LiveCamera/> */}
      {/* <CameraStream/> */}
      <div className='mainNavDiv'>
        <nav className='mainNav'>
          {authorized === 0
            ?
            <NavLink to="Login">Login</NavLink>
            :
            <NavLink to="User">{JSON.parse(localStorage?.getItem('User')).fullname}</NavLink>
          }
          <NavLink to="Production">Production</NavLink>
          <NavLink to="PQA">PQA</NavLink>
          <NavLink to="MySQLController">New Item</NavLink>
        </nav>
      </div>
      <div className='mainPage'>
        <Routes>
          <Route path='/Login' element={<Authentication />}></Route>
          <Route element={<ProtectRoutes />}>
            <Route path='/User' element={<User />}></Route>
            <Route path='/Production' element={<Production />}>
              <Route path="/Production/item" element={<Item />}></Route>
            </Route>
            <Route path='/PQA' element={<PQA />}>
              <Route path='/PQA/Issues' element={<Issues/>}></Route>
              <Route path='/PQA/Issues' element={<Issues/>}></Route>
            </Route>
            <Route path='/MySQLController' element={<MySQLController />}></Route>
          </Route>
        </Routes>
      </div >
    </>
  );
}

export default App;