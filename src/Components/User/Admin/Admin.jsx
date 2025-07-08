import { fetchRolesAXIOS, fetchUsersAXIOS, assignRolesAXIOS } from "../../../API/Axios/axiosCS"
import { useState, useEffect } from "react"
import "./Admin.css"

export default function Admin() {

    const [fullname, setFullname] = useState('')
    const [fullnames, setFullnameS] = useState('')
    const [fullnameArray, setFullnameArray] = useState([])
    const fetchUsers = async () => {
        const res = await fetchUsersAXIOS({ fullname: fullnames })
        setFullnameArray(res.data)
    }

    const [rolename, setRolename] = useState('')
    const [rolenames, setRolenameS] = useState('')
    const [rolenameArray, setRolenameArray] = useState([])
    const fetchRoles = async () => {
        const res = await fetchRolesAXIOS({ rolename: rolenames })
        console.log(res.data)
        setRolenameArray(res.data)
    }

    const assignRoles = async () => {
        const res = await assignRolesAXIOS({ fullname: fullname, role: rolename })
        console.log(res.data)
    }

    useEffect(() => {
        fetchRoles()
    }, [rolename])

    useEffect(() => {
        fetchUsers()
    }, [fullname])


    return (
        <div className='rolesAssignDiv'>
            <div className='rolesAssignHeader'>
                Roles assignment
            </div>
            <div>
                <input type="text" onChange={e => setFullnameS(e.target.value)} />
                <select name="" id="" onChange={e => setFullname(e.target.value)}>
                    <option value=""></option>
                    {fullnameArray.map((e, key) =>
                        <>
                            <option value={e.fullname}>
                                {e.fullname}
                            </option>
                        </>
                    )
                    }
                </select>

                <input type="text" onChange={e => setRolenameS(e.target.value)} />
                <select name="" id="" onChange={e => setRolename(e.target.value)}>
                    <option value=""></option>
                    {rolenameArray.map((e, key) =>
                        <option value={e.rolename}>{e.rolename}</option>
                    )}

                </select>

                <button onClick={assignRoles}>Assign</button>
            </div>
        </div>
    )
}