import './App.css';
import { Route, Routes, NavLink, } from 'react-router-dom';
import Production from './Components/Production/Production';
import MySQLController from './Components/MySQLController/MySQLController';
import PQA from './Components/PQA/PQA';
import { useEffect } from 'react';
import { getCheckLoginAXIOS } from './API/Axios/axiosCS';
import Item from './Components/Item/Item';
import Issues from './Components/PQA/Issues/Issues';
import Projects from './Components/PQA/Projects/Projects';
import So from './Components/PQA/SO/SO';
import Equipments from './Components/PQA/Equipments/Equipments';
import Authentication from './Components/Authentication/Authentication';
import User from './Components/User/User'
import Admin from './Components/User/Admin/Admin';
import MyProduction from './Components/User/MyProduction/MyProduction';
import GlobalContent, { useAuth } from './GLOBAL/Global';
import { ProtectRoutes } from './Components/ProtectedRoutes/ProtectedRoutes';
import { useContext, useState } from 'react';
import { getData } from './CustomHooks/LocalStorage/GetData';
import { setData } from './CustomHooks/LocalStorage/StoreData';
import socket from './API/Socket/socket';
import { logout } from './CustomHooks/Logout/logout';
import amadeuslogo from './Img/amadeus_logo.png'
import Statistics from './Components/Statistics/Statistics';
import { checkLogin } from './CustomHooks/Login/LoginHook';

function App() {

  const { authorized, path } = useAuth()
  const { authorizing } = useContext(GlobalContent);

  const logoutBtn = async () => {
    const res = await logout()
    console.log(res)
    if (res === 'logout') {
      authorizing(0)
    } else {
      alert('logout error')
    }
  }

  const [role, setRole] = useState('')
  const getRole = () => {
    const res = getData()
    console.log(res.role)
    setRole(res.role)
  }
  const [admin, setAdmin] = useState(0)
  const getAdmin = () => {
    const res = getData()
    setAdmin(res.admin)
  }



  useEffect(() => {
    getRole()
    getAdmin()
  }, [authorized])

  // const checkLogin = async (e) => {
  //   console.log(e)
  //   const storedData = getData()
  //   console.log(storedData)
  //   const res = await getCheckLoginAXIOS({ username: storedData.username, token: storedData.token })
  //   console.log(res.data)
  //   if ((res.data.length) != 0) {
  //     authorizing(1)
  //   } else {
  //     setData({ username: '', token: '', fullname: '' })
  //     authorizing(0)
  //   }
  // }

  const checkLoginHook = async () => {
    const res = await checkLogin()
    if (res != 0) {
      authorizing(1)
    }
    if (res === 'error') {
      console.log('error')
      setData({ username: '', token: '', fullname: '', role: '' })
      authorizing(0)
    }
  }

  useEffect(() => {
    socket.on('socketCheckLogin', (data) => {
      console.log('socketchecklogin')
      checkLoginHook(data)
    })
  }, [])

  useEffect(() => {
    // setPathGlobal(window.location.href)
    console.log(path)
    checkLoginHook()
  }, [])

  const [globalDate, setGlobalDate] = useState('')
  const globalDatef = () => {
    var d = new Date()

    var dMonth = d.getMonth()

    var listmonths =
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Out",
        "Nov",
        "Dec",
      ]

    dMonth = listmonths[dMonth]

    var dDay = d.getDate()
    if (dDay < 10) {
      dDay = '0' + dDay
    }

    var dHour = d.getHours()
    if (dHour < 10) {
      dHour = '0' + d.getHours()
    }

    var dMin = d.getMinutes()
    if (dMin < 10) {
      dMin = '0' + d.getMinutes()
    }

    var dSec = d.getSeconds()
    if (dSec < 10) {
      dSec = '0' + d.getSeconds()
    }

    var concatDate = dDay + '-' + dMonth + '-' + d.getFullYear() + ' ' + dHour + ':' + dMin + ':' + dSec

    setGlobalDate(concatDate)
  }

  setInterval(() => {
    globalDatef()
  }, 1000);

  return (
    <>
      {/* <LiveCamera/> */}
      {/* <CameraStream/> */}
      <div className='rootPage'>
        <div className='rootHeader'>
          <div>
            <NavLink to='/' className='amadeusLogoMenu'>
              <img src={amadeuslogo} alt="" />
            </NavLink>
          </div>
          <div style={{ color: 'var(--light)', fontSize: '12px' }}>
            {globalDate}
          </div>
          <div style={{ color: 'var(--light)', fontSize: '12px' }}>
            {JSON.parse(localStorage.getItem('User'))?.fullname}
          </div>
          <div>
            <NavLink to='/' onClick={e => logoutBtn(e)} className='logoutBtn'>EXIT</NavLink>
          </div>
        </div>
        <div className='rootBody'>
          <div className='mainNavDiv'>
            <nav className='mainNav'>
              {authorized === 0
                ?
                null
                :
                <>
                  <NavLink to="User">My account</NavLink>
                  <NavLink to="Production">Production Team</NavLink>
                  {role !== 'Quality'
                    ?
                    null
                    :
                    <NavLink to="PQA">PQA Team</NavLink>
                  }
                </>
              }
            </nav>
          </div>
          <div className='mainPage'>
            <Routes>
              {/* <Route path='/' element={<Home />}></Route> */}
              <Route path='/' element={<Authentication />}></Route>
              <Route element={<ProtectRoutes />}>
                <Route path='/User' element={<User />}>
                  <Route path="/User/MyProduction/item" element={<Item path={'User/MyProduction'} />}></Route>
                  {admin === 1 ?
                    <Route path="/User/Admin" element={<Admin />}></Route>
                    : null
                  }
                  <Route path="/User/MyProduction" element={<MyProduction />}></Route>
                </Route>
                <Route path='/Production' element={<Production />}>
                  <Route path="/Production/item" element={<Item path={'Production'} />}></Route>
                  <Route path='/Production/MySQLController' element={<MySQLController />}></Route>
                </Route>
                {role !== 'Quality' ? null
                  :
                  <Route path='/PQA' element={<PQA />}>
                    <Route path='/PQA/Issues' element={<Issues />}></Route>
                    <Route path='/PQA/Projects' element={<Projects />}></Route>
                    <Route path='/PQA/So' element={<So />}></Route>
                    <Route path='/PQA/Equipments' element={<Equipments />}></Route>
                    {/* <Route path='/PQA/Statistics' element={<Statistics />}></Route> */}
                  </Route>
                }
              </Route>
            </Routes>
          </div >
        </div>
      </div>
    </>
  );
}

export default App;