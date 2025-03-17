import './Equipments.css'
import axios from 'axios'
import { fetchEquipmentsAXIOS } from '../../API/Axios/axios'
import { Outlet, NavLink, Route, Routes } from "react-router-dom"
import { useState, useEffect } from 'react'
import Item from '../Item/Item'

export default function Equipments({ project, so }) {

    const [equipments, setEquipments] = useState([])

    const fetchEquipments = async () => {
        const res = await fetchEquipmentsAXIOS()
        console.log(res)
        setEquipments(res.data[0])
    }

    useEffect(() => {
        fetchEquipments()
    }, [])


    return (
        <>
            <div className="equipMainDiv">
                <nav class="equipNav">
                    {equipments.map((e) =>
                        <>
                            <NavLink to={'/Production/' + project + '/' + so + '/' + (e.equipName).replace(/ +/g, "")}> {e.equipName} </NavLink>
                        </>
                    )
                    }
                </nav>
                <div className="equipContentDiv">
                    {equipments.map((e) =>
                        <>
                            <Routes>
                                <Route path={(e.equipName).replace(/ +/g, "") + '/*'} element={<Item so={so} project={project} equipment={e.equipName} />}></Route>
                            </Routes>
                        </>
                    )
                    }
                </div>
                <Outlet />
            </div>
        </>
    )
}