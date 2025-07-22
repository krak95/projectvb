import { createWorkWeeksAXIOS, fetchEquipmentsAXIOS, fetchProjectsAXIOS } from "../../../../API/Axios/axiosCS"
import { useEffect, useState } from "react"
import socket from "../../../../API/Socket/socket"
import "./CreateWorkWeek.css"


export default function CreateWorkWeeks() {

    const [projectsArray, setProjectsArray] = useState([])
    const fetchProject = async () => {
        const res = await fetchProjectsAXIOS({
            project: '',
            country: '',
            proj_manager: '',
            client_name: ''
        })
        console.log(res)
        setProjectsArray(res.data)
    }
    const [equipArray, setEquipArray] = useState([])
    const fetchEquips = async () => {
        const res = await fetchEquipmentsAXIOS({ EquipName: '' })
        setEquipArray(res.data)
    }

    const createWW = async () => {
        const date = new Date()
        try {
            const res = await createWorkWeeksAXIOS({ ww_number: ww_number + '_' + date.getFullYear(), equipment, quantity_need, quantity_done: '0', project })
            console.log(res)
            socket.emit("newWW")
        } catch (e) {
            console.log(e)
        }
    }
    const [project, setProject] = useState()
    const [equipment, setEquip] = useState()
    const [ww_number, setww_number] = useState()
    const [quantity_need, setQuantityNeed] = useState()

    useEffect(() => {
        fetchProject()
        fetchEquips()
    }, [])

    return (
        <>
            <div className="createWorkWeekMainDiv">
                <div>
                    <select name="" id="" onChange={e => setProject(e.target.value)}>
                        <option value="">Projects</option>
                        {projectsArray.map((e, key) =>
                            <>
                                <option value={e.project}>
                                    {e.project}
                                </option>
                            </>
                        )}
                    </select>
                </div>
                <div>
                    <select name="" id="" onChange={e => setEquip(e.target.value)}>
                        <option value="">Equipment</option>
                        {equipArray.map((e, key) =>
                            <>
                                <option value={e.equipName}>
                                    {e.equipName}
                                </option>
                            </>
                        )}
                    </select>
                </div>
                <div>

                    <input type="text" placeholder="QuantityNeed" onChange={e => setQuantityNeed(e.target.value)} />
                </div>
                <div>
                    <input type="number" placeholder="WorkWeek" onChange={e => setww_number(e.target.value)} />
                </div>
                <div>
                    <button onClick={e => createWW()}> Create WorkWeek</button>
                </div>
            </div>
        </>
    )
}
