import { registerAXIOS } from "../../../API/Axios/axiosCS"
import "./Register.css"
import { useState } from "react"

export default function Register() {

    const [fullname, setFullname] = useState('')
    const [admin, setAdmin] = useState(0)
    const [role, setRole] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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
        } catch (e) {
            console.log(e.response.data)
            if ((e.response.data.message).includes('Duplicate')) {
                alert('User already exists!')
            }
        }
    }

    return (
        <>
            <div className="registerMainDiv">
                <div className="registerInputDiv">
                    <div>
                        <div>Fullname</div>
                        <div><input onChange={e => setFullname(e.target.value)} type="text" /></div>
                    </div>
                    <div>
                        <div>Admin</div>
                        <div><input onChange={e => setAdmin(e.target.value)} type="number" /></div>
                    </div>
                    <div>
                        <div>Role</div>
                        <div><input onChange={e => setRole(e.target.value)} type="text" /></div>
                    </div>
                    <div>
                        <div>Username</div>
                        <div><input onChange={e => setUsername(e.target.value)} type="text" /></div>
                    </div>
                    <div>
                        <div>Password</div>
                        <div><input onChange={e => setPassword(e.target.value)} type="password" /></div>
                    </div>
                    <div>
                        <button className="loginBtn" onClick={register} >Register</button>
                    </div>
                </div>
            </div>

        </>
    )
}