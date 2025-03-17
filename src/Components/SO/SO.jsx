import { fetchSOAXIOS } from "../../API/Axios/axios"
import { useEffect, useState } from "react"
import { Outlet, NavLink, Route, Routes } from "react-router-dom"
import Equipments from "../Equipments/Equipments"



export default function SO({ project }) {

    const [so, setSO] = useState([])

    const fetchSO = async () => {
        const res = await fetchSOAXIOS({ project })
        console.log(res)
        setSO(res.data[0])
    }

    useEffect(() => {
        fetchSO()
    }, [])

    return (
        <>
        <div className="prodMainDiv">
            <nav class="prodNav">
                {so.map((e) =>
                    <>
                        <NavLink to={'/Production/'+project+'/'+e.SOref}> {e.SOref} </NavLink>
                    </>
                )
                }
            </nav>
            <div className="prodContentDiv">
                {so.map((e) =>
                    <>
                        <Routes>
                            <Route path={e.SOref+'/*'} element={<Equipments project={e.project} so={e.SOref} />}></Route>
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