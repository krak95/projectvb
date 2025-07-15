import { useEffect, useState } from "react"
import { fetchCountProductionAXIOS, fetchProductionAXIOS, fetchWorkWeeksAXIOS, fetchWorkWeeksNRAXIOS } from "../../../API/Axios/axiosCS"
import { NavLink, Outlet } from "react-router-dom"
import './WorkWeek.css'


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
        fetchProd()
    }, [workweek])
    useEffect(() => {
        fetchWorkWeeks()
        fetchWorkWeeksNR()
    }, [workweek])

    return (
        <>
            <div className="wwMainDiv" style={{ backgroundColor: 'white' }}>
                <input type="text" onChange={e => setWorkweek(e.target.value)} />
                <div className="wwContentDiv">
                    <div>
                        quant done: {quantDone}
                    </div>
                    <div className="wwGrid">
                        {workweeksArrayNR.map((e, key) =>
                            <NavLink key={key} to={"/Supervisor/WeekDetails?" + "ww_number=" + e.ww_number} >
                                <div>
                                    wwnumber:
                                    {e.ww_number}
                                </div>

                            </NavLink>
                        )}
                    </div>
                    <div >
                        {prodArray.map((e, key) =>
                            <div>
                                equip:
                                {e.equipment}
                            </div>
                        )}
                    </div>
                    <div>

                    </div>
                </div>
            </div >
            <Outlet />

        </>
    )
}