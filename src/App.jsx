import './App.css';
import { Route, Routes, NavLink, } from 'react-router-dom';
import Production from './Components/Production/Production';
import MySQLController from './Components/MySQLController/MySQLController';
import PQA from './Components/PQA/PQA';
import { useEffect } from 'react';
import Item from './Components/Item/Item';
import Issues from './Components/PQA/Issues/Issues';
import Projects from './Components/PQA/Projects/Projects';
import So from './Components/PQA/SO/SO';
import Equipments from './Components/PQA/Equipments/Equipments';
import Authentication from './Components/Authentication/Authentication';
import User from './Components/User/User'
import Admin from './Components/User/Admin/Admin';
import MyProduction from './Components/User/MyProduction/MyProduction';
import Products from './Components/Production/Products/Products';
import Supervisor from './Components/Supervisor/Supervisor';
import WorkWeeks from './Components/Supervisor/WorkWeeks/WorkWeeks';
import WeekDetails from './Components/Supervisor/WeekDetails/WeekDetails';
import WeekPlan from './Components/Supervisor/WeekDetails/WeekPlan/WeekPlan';
import GlobalContent, { useAuth } from './GLOBAL/Global';
import { ProtectRoutes } from './Components/ProtectedRoutes/ProtectedRoutes';
import { useContext, useState } from 'react';
import { setData } from './CustomHooks/LocalStorage/StoreData';
import socket from './API/Socket/socket';
import { logout } from './CustomHooks/Logout/logout';
import amadeuslogo from './Img/amadeus_logo.png'
import { checkLogin } from './CustomHooks/Login/LoginHook';
import Jobs from './Components/Production/Jobs/Jobs';
import CreateWorkWeeks from './Components/Supervisor/WorkWeeks/CreateWorkWeeks.jsx/CreateWorkWeeks';

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
    console.log(res)
    if (res != 'error') {
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
      <div className='rootPage' style={{ backgroundImage: 'url(' + amadeuslogo + ')', backgroundRepeat: "repeat-x repeat-y", backgroundSize: "300px auto" }}>
        <div className='rootHeader'>
          <div>
            <NavLink to='/' className='amadeusLogoMenu'>
              <img src={amadeuslogo} alt="" />
            </NavLink>
          </div>
          <div style={{ color: 'var(--light)', fontSize: '12px' }}>
            {globalDate}
          </div>
          <div >
            <NavLink style={{ color: 'var(--light) !important', fontSize: '12px' }} to="User">{JSON.parse(localStorage.getItem('User'))?.fullname}</NavLink>
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
                  <NavLink to="Production">Production Team</NavLink>
                  {JSON.parse(localStorage.getItem('User')).role !== ('Quality' && 'Supervisor')
                    ?
                    null
                    :
                    <NavLink to="PQA">PQA Team</NavLink>
                  }
                  {JSON.parse(localStorage.getItem('User')).role !== 'Supervisor'
                    ?
                    null
                    :
                    <NavLink to="Supervisor">Supervisor Team</NavLink>
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
                  {JSON.parse(localStorage.getItem('User')).admin === 1 ?
                    <Route path="/User/Admin" element={<Admin />}></Route>
                    : null
                  }
                  <Route path="/User/MyProduction" element={<MyProduction />}></Route>
                </Route>
                <Route path='/Production' element={<Production />}>
                  <Route path='/Production/Products' element={<Products />}>
                    <Route path="/Production/Products/item" element={<Item path={'Production/Products'} />}></Route>
                    <Route path='/Production/Products/MySQLController' element={<MySQLController />}></Route>
                  </Route>
                  <Route path='/Production/Jobs' element={<Jobs />}>
                  </Route>
                </Route>
                {JSON.parse(localStorage.getItem('User')).role !== ('Quality' && 'Supervisor') ? null
                  :
                  <Route path='/PQA' element={<PQA />}>
                    <Route path='/PQA/Issues' element={<Issues />}></Route>
                    <Route path='/PQA/Projects' element={<Projects />}></Route>
                    <Route path='/PQA/So' element={<So />}></Route>
                    <Route path='/PQA/Equipments' element={<Equipments />}></Route>
                    {/* <Route path='/PQA/Statistics' element={<Statistics />}></Route> */}
                  </Route>
                }
                {JSON.parse(localStorage.getItem('User')).role !== 'Supervisor' ? null
                  :
                  <Route path='/Supervisor' element={<Supervisor />}>
                    <Route path='/Supervisor/WorkWeeks' element={<WorkWeeks />}>
                      <Route path='/Supervisor/WorkWeeks/CreateWorkWeeks' element={<CreateWorkWeeks />}></Route>
                    </Route>
                    <Route path='/Supervisor/WeekDetails' element={<WeekDetails />}>
                    </Route>
                    <Route path='/Supervisor/WeekPlan' element={<WeekPlan />}></Route>
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