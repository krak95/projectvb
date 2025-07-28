import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductionAXIOS, fetchWorkWeeksProjectAXIOS, fetchBackLogAXIOS } from "../../../API/Axios/axiosCS";
import { NavLink, Outlet } from "react-router-dom";
import "./WeekDetails.css"
export default function WeekDetails() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const ww_number = queryParams.get('ww_number');

    const [prodArray, setProdArray] = useState([])
    const [quantDone, setQuantDone] = useState(0)

    const fetchProd = async () => {
        const res = await fetchWorkWeeksProjectAXIOS({
            ww_number: ww_number
        })
        console.log(res.data)
        setProdArray(res.data)
        setQuantDone((res.data).length)
    }

    useEffect(() => {
        fetchProd()
    }, [])

    return (
        <div className="weekDetailMainDiv">
            <div className="weekDetailHeader">
                Projects from Week {ww_number}
            </div>
            <div className="weekDetailGridDiv">
                {prodArray.map((e, key) =>
                    <NavLink key={e.project} to={'/Supervisor/WeekPlan?' + 'project=' + e.project + "&ww_number=" + e.ww_number}>
                        < div>
                            {e.project}
                        </div>
                    </NavLink >
                )
                }
            </div>
            <div>
                <Outlet />
            </div>
        </div >
    )
}