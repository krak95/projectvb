
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchProductionAXIOS, fetchWorkWeeksAXIOS } from "../../../../API/Axios/axiosCS";
import "./WeekPlan.css"
import EquipCardPlan from "./EquipCardPlan";

export default function WeekPlan() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const project = queryParams.get('project');
    const ww_number = queryParams.get('ww_number');


    const [workWeekArr, setWorkWeeksArray] = useState([])
    const fetchWorkWeeks = async () => {
        const res = await fetchWorkWeeksAXIOS({ ww_number: ww_number, project: project })
        console.log(res)
        setWorkWeeksArray(res.data)
    }

    const handleRetro = () => {
        window.location.href = 'http://localhost:3000/Supervisor/WeekDetails?ww_number=' + ww_number
    };

    const fetchProd = async () => {
        try {
            const res = await fetchProductionAXIOS({})
            console.log(res)
        } catch (e) {

            console.log(e)
        }
    }

    useEffect(() => {
        fetchWorkWeeks()
        fetchProd()
    }, [ww_number, project])


    return (
        <>
            <div className="weekPlanBackBtnDiv">
                <button onClick={handleRetro}>BACK</button>
            </div>
            <div className="weekPlanHeader">
                <p style={{ color: 'var(--light)' }}>Week {ww_number}</p>
            </div>
            <div className="weekPlanMainDiv">
                <div className="weekPlanProjectHeader">
                    {project}
                </div>

                <div className="weekPlanCardsDiv">
                    {workWeekArr.map((e, key) =>
                        <div className="weekPlanContentDiv">
                            <EquipCardPlan equipment={e.equipment} project={e.project} qn={e.quantity_need} qd={e.quantity_done} ww_number={ww_number} />

                            {/* <div>
                                {e.equipment}
                                </div>
                                <div>
                                Need: {e.quantity_need}
                                </div>
                                <div>
                                Done: {e.quantity_done}
                                </div>
                                <div>
                                Left: {e.quantity_need - e.quantity_done}
                                </div> */}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}