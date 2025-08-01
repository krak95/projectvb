import "./Authentication.css"
import Register from "./Register/Register"
import Login from "./Login/Login"
import amadeus_logo from "./../../Img/amadeus_logo.png"
import { useAuth } from "../../GLOBAL/Global"
import GlobalContent from "../../GLOBAL/Global"
import { useContext } from "react"

export default function Authentication() {
    const { swapRegisterLogin, authorized } = useAuth()
    const { swapRegisterLoginF } = useContext(GlobalContent);

    return (
        <>
            {authorized === 0 ? <div className="authMainDiv">
                <div>
                    <div className="btnDiv">
                        <button className={(swapRegisterLogin === 'register' ? 'swapregBtn focusBtn' : 'swapregBtn')} onClick={e => swapRegisterLoginF('register')}>Register</button>
                        <button className={(swapRegisterLogin === 'login' ? 'swaplogBtn focusBtn' : 'swaplogBtn')} onClick={e => swapRegisterLoginF('login')}>Login</button>
                    </div>
                    {swapRegisterLogin === 'register' ? <Register /> : <Login />}
                </div>
            </div>
                : null}
            <div className="logoDiv">
                <img src={amadeus_logo} alt="" />
            </div>
        </>
    )
}