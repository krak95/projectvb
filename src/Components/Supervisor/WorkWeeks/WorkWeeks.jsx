import { useEffect, useState } from "react"
import { fetchCountProductionAXIOS, fetchProductionAXIOS, fetchWorkWeeksAXIOS, fetchWorkWeeksNRAXIOS } from "../../../API/Axios/axiosCS"
import { NavLink, Outlet } from "react-router-dom"
import './WorkWeek.css'
import socket from "../../../API/Socket/socket"

export default function WorkWeeks() {

    const [prodArray, setProdArray] = useState([])
    const [workweeksArray, setWorkWeeksArray] = useState([])
    const [workweeksArrayNR, setWorkWeeksNRArray] = useState([])
    const [workweek, setWorkweek] = useState('')

    const [quantDone, setQuantDone] = useState('')
    const fetchProd = async () => {
        const res = await fetchProductionAXIOS({
            Project: '',
            So: '',
            Equipment: '',
            CodeA: '',
            CodeB: '',
            CodePR: '',
            CodePS: '',
            CodeDR: '',
            Type0: '',
            Type1: '',
            Type2: '',
            Type3: '',
            Type4: '',
            Tester: '',
            ww_number: workweek
        })
        console.log(res)
        setProdArray(res.data)
        setQuantDone((res.data).length)
    }

    const fetchWorkWeeks = async () => {
        const res = await fetchWorkWeeksAXIOS({ ww_number: workweek })
        console.log(res)
        setWorkWeeksArray(res.data)
    }

    const fetchWorkWeeksNR = async () => {
        const res = await fetchWorkWeeksNRAXIOS()
        console.log(res)
        setWorkWeeksNRArray(res.data)

    }


    useEffect(() => {
        socket.on('fetchWW', (data) => {
            console.log('newWW on socket', data)
            fetchWorkWeeksNR()
        })
    }, [])
    useEffect(() => {
        fetchProd()
    }, [workweek])
    useEffect(() => {
        fetchWorkWeeks()
        fetchWorkWeeksNR()
    }, [workweek])

    return (
        <>
            <div className="mainNav">
                <NavLink to='/Supervisor/WorkWeeks/CreateWorkWeeks'> New WorkWeek</NavLink>
            </div>
            <div className="wwMainDiv">
                <Outlet />
                {/* <input type="text" onChange={e => setWorkweek(e.target.value)} /> */}
                <div className="wwContentDiv">
                    <div className="wwGrid">
                        {workweeksArrayNR.map((e, key) =>
                            <NavLink key={key} to={"/Supervisor/WeekDetails?" + "ww_number=" + e.ww_number}>
                                <div>
                                    Week {e.ww_number}
                                </div>
                            </NavLink>
                        )}
                    </div>
                </div>
            </div >

        </>
    )
}