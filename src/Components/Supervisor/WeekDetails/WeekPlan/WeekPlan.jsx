
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchBacklogAXIOS, fetchProductionAXIOS, fetchWorkWeeksAXIOS } from "../../../../API/Axios/axiosCS";
import "./WeekPlan.css"
import EquipCardPlan from "./EquipCardPlan";
import { NavLink } from "react-router-dom";
import $ from 'jquery'

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
            const res = await fetchProductionAXIOS()
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    const [backlog, setBacklog] = useState([])
    const fetchBacklog = async () => {
        try {
            const res = await fetchBacklogAXIOS({ ww_number: ww_number.slice(0, 2) })
            console.log(res)
            setBacklog(res.data)
        } catch (e) {

        }
    }
    useEffect(() => {
        fetchBacklog()
    }, [])

    useEffect(() => {
        fetchWorkWeeks()
        fetchProd()
    }, [ww_number, project])


    // useEffect(() => {

    //     var array = $('.backlogScroll a')
    //     var nrEl = $('.backlogScroll a').length
    //     var maxEl = 3
    //     var pagenr = 1
    //     var maxPagenr = Math.ceil(nrEl / maxEl)
    //     console.log(maxPagenr)

    //     $('.backlogScroll a').hide()
    //     $('.backlogScroll').append('<div>' + pagenr + '/' + maxPagenr + '</div>')

    //     for (let nrEl = 0; nrEl < maxEl; nrEl++) {
    //         $('.backlogScroll a[sShow=' + nrEl + ']').show()
    //     }

    // }, [backlog])



    return (
        <>
            <div className="weekPlanBackBtnDiv">
            </div>
            <div className="weekPlanHeader">
                <div>
                    <button onClick={handleRetro}>BACK</button>
                </div>
                <div>
                    <p style={{ color: 'var(--light)' }}>Week {ww_number}</p>
                </div>
                <div></div>
            </div>
            <div className="weekPlanMainDiv">
                <div className="weekPlanCardsDiv">

                    {workWeekArr.map((e, key) =>
                        <NavLink key={e.idworkweeks} to={'/Production/Products'} state={{ workweek: e.ww_number, project: e.project, equipment: e.equipment }}>
                            <div className="weekPlanContentDiv">

                                <EquipCardPlan idworkweeks={e.idworkweeks} project={e.project} equipment={e.equipment} qn={e.quantity_need} qd={e.quantity_done} ww_number={ww_number} />

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
                        </NavLink>
                    )}
                </div>
                <div className="weekPlanCardsDiv backlogDiv">
                    <div className="backlogHeader">
                        Backlog
                    </div>
                    <div className="backlogCards">
                        <div className="backlogScroll">
                            {backlog.map((e, key) =>
                                <NavLink key={e.idworkweeks} to={'/Production/Products'} state={{ workweek: e.ww_number, project: e.project, equipment: e.equipment }} >
                                    <div className="weekPlanContentDiv">
                                        <>
                                            <EquipCardPlan idworkweeks={e.idworkweeks} equipment={e.equipment} project={e.project} qn={e.quantity_need} qd={e.quantity_done} ww_number={e.ww_number} />
                                        </>
                                    </div>
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}