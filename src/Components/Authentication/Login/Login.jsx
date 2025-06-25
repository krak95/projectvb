import "./Login.css"
import { getCheckLoginAXIOS, checkCredsAXIOS, newLoginAXIOS, refreshLogAXIOS } from "../../../API/Axios/axiosCS"
import { useState, useContext, useEffect } from "react"
import GlobalContent, { useAuth } from "../../../GLOBAL/Global"
import { storeData } from "../../../CustomHooks/LocalStorage/StoreData"
import { Navigate } from "react-router-dom"
import { setData } from "../../../CustomHooks/LocalStorage/StoreData"
import socket from "../../../API/Socket/socket"
import { datefunction } from "../../../CustomHooks/Date/Date"

export default function Login() {

    const { authorizing } = useContext(GlobalContent);
    const { authorized, fullname } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const checkCreds = async () => {
        try {
            console.log(username, password)
            const res = await checkCredsAXIOS({ username, password })
            if (res.data !== "Wrong credentials!") {
                const concatDate = datefunction()
                console.log(res.data)
                newLogin({ fullname: res.data })
                socket.emit("newUserSocket", concatDate)


            } else {
                alert('Wrong credentials!')
            }
        } catch (e) {
            if ((e.response.data.message).includes('negative')) {
                alert('Wrong credentials!')
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
        try {
            const concatDate = datefunction()
            const res = await newLoginAXIOS({ username, fullname: e.fullname, logDate: concatDate })
            // localStorage.setItem('username', username)
            // localStorage.setItem('token', res.data)
            setData({ username: username, token: res.data, fullname: e.fullname })
            authorizing(1)
            socket.emit('socketCheckLogin', { username: username, token: res.data, fullname: e.fullname })
            // redirect("/User")
        } catch (error) {
            console.log(error)
            if ((error.response.data.message).includes('Duplicate')) {
                alert('Already logged in!')
                const concatDate = datefunction()
                refreshLog({ username: username, logDate: concatDate, fullname: e.fullname })
            }
        }
    }

    const refreshLog = async (e) => {
        try {
            const res = await refreshLogAXIOS({ username: username, logDate: e.logDate })
            console.log(res.data)
            setData({ username: e.username, token: res.data, fullname: e.fullname })
            authorizing(1)
            socket.emit('socketCheckLogin', { username: username, token: res.data, fullname: e.fullname })
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
                            <div><input
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        checkCreds()
                                    }
                                }}
                                onChange={e => setUsername(e.target.value)} type="text" />
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
                        <div>
                            <button onClick={e => checkCreds()} className="loginBtn" >Login</button>
                        </div>
                    </div>
                </div>
                :
                <Navigate to='/User' />
            }
        </>
    )
}