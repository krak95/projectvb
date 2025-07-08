import { useEffect } from "react"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { NavLink } from 'react-router-dom';
import { getData } from "../../CustomHooks/LocalStorage/GetData";


export default function User() {

    const [admin, setAdmin] = useState(0)
    const getAdmin = () => {
        const res = getData()
        setAdmin(res.admin)
    }

    useEffect(() => {
        getAdmin()
    }, [])


    return (
        <>
            <div className='mainNav'>
                {
                    admin === 0
                        ?
                        null
                        :
                        <NavLink to='/User/Admin'>Admin</NavLink>
                }
                <NavLink to='/User/MyProduction'>MyProduction</NavLink>
            </div>
            <Outlet />

        </>
    )
}