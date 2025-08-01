import { useEffect, useState } from "react"
import { fetchProductionAXIOS, fetchWorkWeeksNRAXIOS } from "../../../API/Axios/axiosCS"
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
        fetchWorkWeeksNR()
    }, [workweek])



    var d = new Date()

    var dMonth = d.getMonth()

    var listmonths = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Out",
        "Nov",
        "Dec",
    ]

    dMonth = listmonths[dMonth]

    var dDay = d.getDate()
    if (dDay < 10) {
        dDay = '0' + dDay
    }

    var dHour = d.getHours()
    if (dHour < 10) {
        dHour = '0' + d.getHours()
    }

    var dMin = d.getMinutes()
    if (dMin < 10) {
        dMin = '0' + d.getMinutes()
    }

    var dSec = d.getSeconds()
    if (dSec < 10) {
        dSec = '0' + d.getSeconds()
    }

    var concatDate = dDay + '-' + dMonth + '-' + d.getFullYear()

    const [dayDate, setDayDate] = useState('')
    const [monthDate, setMonthDate] = useState('')
    const [yearDate, setYearDate] = useState('')
    const [fullDate, setFullDate] = useState('')
    const [workweek1, setWorkWeek1] = useState('')


    const wwGenerator = () => {
        const date = new Date(d.getFullYear(), d.getMonth(), dDay)
        const nearThursday = new Date(date.valueOf())
        nearThursday.setDate(nearThursday.getDate() + 3 - ((nearThursday.getDay() + 6) % 7))

        const firstThursday = new Date(nearThursday.getFullYear(), 0, 4)

        firstThursday.setDate(firstThursday.getDate() + 3 - ((firstThursday.getDay() + 6) % 7))

        const weekNumber = 1 + Math.round((nearThursday - firstThursday) / (7 * 24 * 60 * 60 * 1000))

        setWorkWeek1(weekNumber)

        console.log('wwGenerator:', { weekNumber, year: d.getFullYear(), month: dMonth - 1, dDay })
    }
    useEffect(() => { wwGenerator() }, [])


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
                            <NavLink style={workweek1 == ((e.ww_number).slice(0, 2)) ? { backgroundColor: 'var(--green)' } : null} key={e.ww_number} to={"/Supervisor/WeekDetails?" + "ww_number=" + e.ww_number}>
                                <div>
                                    Week {e.ww_number}
                                </div>
                            </NavLink>
                        )
                        }
                    </div>
                </div>
                {/* <div className="bottomLayerDeck">
                    BOTTOM LAYER
                </div> */}
            </div >
        </>
    )
}