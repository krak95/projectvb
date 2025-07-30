import { registerAXIOS } from "../../../API/Axios/axiosCS"
import "./Register.css"
import { useState } from "react"
import { useContext } from "react"
import GlobalContent from "../../../GLOBAL/Global"

export default function Register() {

    const [fullname, setFullname] = useState('')
    const [admin, setAdmin] = useState(0)
    const [role, setRole] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')

    const { swapRegisterLoginF } = useContext(GlobalContent);

    const register = async () => {
        try {
            const res = await registerAXIOS({
                fullname,
                admin,
                role,
                username,
                password
            })
            console.log(res.data)
            setAlert('green')
            setTimeout(() => {
                swapRegisterLoginF('login')
            }, 1000);
        } catch (e) {
            console.log(e)
            if ((e.response.data.message).includes('Duplicate' && 'username')) {
                setAlert('usernameerror')
                swapRegisterLoginF('register')
            }
            if ((e.response.data.message).includes('Duplicate' && 'fullname')) {
                setAlert('fullnameerror')
                swapRegisterLoginF('register')
            }
        }
    }

    return (
        <>
            <div className="registerMainDiv">
                <div className="registerInputDiv">
                    <div>
                        <div>Fullname</div>
                        <div><input onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                register()
                            }
                        }}
                            onChange={e => setFullname(e.target.value)} type="text" /></div>
                    </div>
                    {/* <div>
                        <div>Admin</div>
                        <div><input onChange={e => setAdmin(e.target.value)} type="number" /></div>
                    </div> */}

                    <div>
                        <div>Username</div>
                        <div><input onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                register()
                            }
                        }}
                            onChange={e => setUsername(e.target.value)} type="text" /></div>
                    </div>
                    <div>
                        <div>Password</div>
                        <div><input onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                register()
                            }
                        }}
                            onChange={e => setPassword(e.target.value)} type="password" /></div>
                    </div>
                    <div>
                        <button className="loginBtn"

                            onClick={register}
                        >Register</button>
                    </div>
                    {
                        alert === 'green'
                            ?
                            <div>
                                <div style={{ color: 'var(--green)' }}>Registered successfully...</div>
                            </div>
                            : null
                    }
                    {
                        alert === 'usernameerror'
                            ?
                            <div>
                                <div style={{ color: 'var(--red)' }}>User already exists!</div>
                            </div>
                            : null
                    }
                    {
                        alert === 'fullnameerror'
                            ?
                            <div>
                                <div style={{ color: 'var(--red)' }}>Name already exists!</div>
                            </div>
                            : null
                    }
                </div>
            </div>

        </>
    )
}