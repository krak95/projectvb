import { useEffect, useState } from "react"
import { fetchChecklistsTemplateAXIOS } from "../../../../API/Axios/axiosCS"
import { useLocation } from "react-router-dom";
import "./ChecklistsCreate.css"

export default function ChecklistsCreate() {

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const projecth = queryParams.get('project');
    const equipmenth = queryParams.get('equipment');
    const type0h = queryParams.get('type0');
    const type1h = queryParams.get('type1');
    const type2h = queryParams.get('type2');
    const type3h = queryParams.get('type3');
    const type4h = queryParams.get('type4');

    const [checklistTemplateArr, setchecklistTemplateArr] = useState([])

    const fetchChecklistsTemplate = async () => {
        try {
            const res = await fetchChecklistsTemplateAXIOS({
                project: projecth,
                equipment: equipmenth,
                type0: type0h,
                type1: type1h,
                type2: type2h,
                type3: type3h,
                type4: type4h,
            })
            setchecklistTemplateArr(res.data)
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchChecklistsTemplate()
    }, [
        projecth,
        equipmenth,
        type0h,
        type1h,
        type2h,
        type3h,
        type4h
    ])

    return (
        <div className="checklistCreateMainDiv">
            {checklistTemplateArr.map((e, key) =>
                <div className="checklistCreateList">
                    <div>
                        {e.action}
                    </div>
                    <div>
                        <button>Add to Checklist</button>
                    </div>
                </div>
            )}
        </div>
    )
}