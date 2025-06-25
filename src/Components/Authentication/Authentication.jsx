import { registerAXIOS } from "../../API/Axios/axiosCS"
import "./Authentication.css"
import { useState } from "react"
import Register from "./Register/Register"
import Login from "./Login/Login"

export default function Authentication() {

    const [swapAuth, setSwapAuth] = useState('register')

    return (
        <>
            <div className="authMainDiv">
                <div className="btnDiv">
                    <button className={(swapAuth === 'register' ? 'swapregBtn focusBtn' : 'swapregBtn')} onClick={e => setSwapAuth('register')}>Register</button>
                    <button className={(swapAuth === 'login' ? 'swaplogBtn focusBtn' : 'swaplogBtn')} onClick={e => setSwapAuth('login')}>Login</button>
                </div>
                <div>
                    {swapAuth === 'register' ? <Register /> : <Login />}
                </div>
            </div>
        </>
    )
}