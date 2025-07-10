import "./Login.css"
import { getCheckLoginAXIOS, checkCredsAXIOS, newLoginAXIOS, refreshLogAXIOS } from "../../../API/Axios/axiosCS"
import { useState, useContext, useEffect } from "react"
import GlobalContent, { useAuth } from "../../../GLOBAL/Global"
import { storeData } from "../../../CustomHooks/LocalStorage/StoreData"
import { Navigate, useNavigate } from "react-router-dom"
import { setData } from "../../../CustomHooks/LocalStorage/StoreData"
import socket from "../../../API/Socket/socket"
import { datefunction } from "../../../CustomHooks/Date/Date"
import { Outlet } from "react-router-dom"

export default function Login() {

    const { authorizing } = useContext(GlobalContent);
    const { authorized, fullname } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')

    let navigate = useNavigate('')
    const checkCreds = async () => {
        if (username === '') {
            setAlert('username')
            setTimeout(() => {
                setAlert('')
            }, 1000);
            return
        }
        try {
            console.log(username, password)
            const res = await checkCredsAXIOS({ username, password })
            console.log(res)
            if (res.data !== "Wrong credentials!") {
                const concatDate = datefunction()
                console.log(res.data)
                newLogin({ fullname: res.data['fullname'], role: res.data['role'], admin: res.data['admin'] })
                socket.emit("newUserSocket", concatDate)
                setTimeout(() => {
                    navigate('/Production')
                }, 100);

            } else {
                setAlert('wrong')
                setTimeout(() => {
                    setAlert('')
                }, 1000);
            }
        } catch (e) {
            console.log(e)
            if ((e.response.data.message).includes('negative')) {
                setAlert('wrong')
                setTimeout(() => {
                    setAlert('')
                }, 1000);
            }
        }
    }

    // const checkLogin = async () => {
    //     const storedData = storeData()
    //     const res = await getCheckLoginAXIOS({ username: storedData.username, token: storedData.token })
    //     console.log(res.data)
    //     if (res.data == []) {
    //         newLogin()
    //     }
    // }

    const newLogin = async (e) => {
        console.log(e)
        try {
            const concatDate = datefunction()
            const res = await newLoginAXIOS({ username, fullname: e.fullname, logDate: concatDate, role: e.role, admin: e.admin })
            // localStorage.setItem('username', username)
            // localStorage.setItem('token', res.data)
            setData({ username: username, token: res.data, fullname: e.fullname, role: e.role, admin: e.admin })
            authorizing(1)
            socket.emit('socketCheckLogin', { username: username, token: res.data, fullname: e.fullname, role: e.role, admin: e.admin })
            navigate('/Production')

        } catch (error) {
            console.log(error)
            if ((error.response.data.message).includes('Duplicate')) {
                setAlert('loggedin')
                const concatDate = datefunction()
                setTimeout(() => {
                    refreshLog({ username: username, logDate: concatDate, fullname: e.fullname, role: e.role, admin: e.admin })
                }, 1000);
            }
        }
    }

    const refreshLog = async (e) => {
        try {
            const res = await refreshLogAXIOS({ username: username, logDate: e.logDate, role: e.role, admin: e.admin })
            console.log(res.data)
            setData({ username: e.username, token: res.data, fullname: e.fullname, role: e.role, admin: e.admin })
            authorizing(1)
            socket.emit('socketCheckLogin', { username: username, token: res.data, fullname: e.fullname, role: e.role, admin: e.admin })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {authorized === 0
                ?
                <div className="loginAuthDiv">

                    <div className="loginInputDiv">
                        <div>
                            <div>Username</div>
                            <div><input style={alert === 'username' ? { backgroundColor: 'var(--red)', opacity: '0.5' } : null}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        checkCreds()
                                    }
                                }}
                                onChange={e => setUsername((e.target.value).trim())} type="text" />
                            </div>
                        </div>
                        <div>
                            <div>Password</div>
                            <div><input
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        checkCreds()
                                    }
                                }}
                                onChange={e => setPassword(e.target.value)} type="password" />
                            </div>
                        </div>
                        {alert === '' ? <div style={{ color: 'var(--light)' }}>
                            default
                        </div> : null}
                        {alert === 'username' ? <div className="loginAlertUsername">
                            Missing username!
                        </div> : null}
                        {alert === 'wrong' ? <div className="loginAlertUsername">
                            Wrong credentials!
                        </div> : null}
                        {alert === 'loggedin' ? <div className="loginAlertUsername">
                            Already logged in ...
                        </div> : null}
                        <div>
                            <button onClick={e => checkCreds()} className="loginBtn" >Login</button>
                        </div>
                    </div>
                </div>
                :
                <Outlet />
            }
        </>
    )
}