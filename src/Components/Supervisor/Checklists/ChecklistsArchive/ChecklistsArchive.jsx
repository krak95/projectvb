import { useState } from "react"
import { fetchChecklistsTemplateAXIOS } from "../../../../API/Axios/axiosCS"
import { useLocation } from "react-router-dom";

export default function ChecklistsArchive() {

    const [project, setproject] = useState('')
    const [equipment, setequipment] = useState('')
    const [action, setaction] = useState('')
    const [type0, settype0] = useState('')
    const [type1, settype1] = useState('')
    const [type2, settype2] = useState('')
    const [type3, settype3] = useState('')
    const [type4, settype4] = useState('')
    const [checklistTemplateArr, setchecklistTemplateArr] = useState([])

    return (
        <div>

        </div>
    )
}