
import { useLocation } from "react-router-dom";

export default function WeekPlan() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const project = queryParams.get('project');
    const ww_number = queryParams.get('ww_number');


    return (
        <>
            <div>
                {project} OF {ww_number}
            </div>
        </>
    )
}