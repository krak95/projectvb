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
import GlobalContent, { useAuth } from './GLOBAL/Global';
import { ProtectRoutes } from './Components/ProtectedRoutes/ProtectedRoutes';
import { useContext } from 'react';
import { getData } from './CustomHooks/LocalStorage/GetData';
import { setData } from './CustomHooks/LocalStorage/StoreData';
import socket from './API/Socket/socket';
import { logout } from './CustomHooks/Logout/logout';
import amadeuslogo from './Img/amadeus_logo.png'
import Statistics from './Components/Statistics/Statistics';

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
      console.log('socketchecklogin')
      checkLogin(data)
    })
  }, [])

  useEffect(() => {
    // setPathGlobal(window.location.href)
    console.log(path)
    checkLogin()
  }, [])

  console.log('App Path:', window.location.href)

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
                  <NavLink to="PQA">PQA Team</NavLink>
                </>
              }
            </nav>
          </div>
          <div className='mainPage'>
            <Routes>
              {/* <Route path='/' element={<Home />}></Route> */}
              <Route path='/' element={<Authentication />}></Route>
              <Route element={<ProtectRoutes />}>
                {/* <Route path='/User' element={<User />}></Route> */}
                <Route path='/Production' element={<Production />}>
                  <Route path="/Production/item" element={<Item />}></Route>
                  <Route path='/Production/MySQLController' element={<MySQLController />}></Route>
                </Route>
                <Route path='/PQA' element={<PQA />}>
                  <Route path='/PQA/Issues' element={<Issues />}></Route>
                  <Route path='/PQA/Projects' element={<Projects />}></Route>
                  <Route path='/PQA/So' element={<So />}></Route>
                  <Route path='/PQA/Equipments' element={<Equipments />}></Route>
                  <Route path='/PQA/Statistics' element={<Statistics />}></Route>
                </Route>
              </Route>
            </Routes>
          </div >
        </div>

      </div>
    </>
  );
}

export default App;