import { useState } from "react"
import { addJobAXIOS } from "../../../API/Axios/axiosCS"
import "./NewJob.css"

export default function NewJob() {


    const [equipment, setEquipment] = useState('')
    const [model, setModel] = useState('')
    const [quantNeed, setQuantNeed] = useState('')
    const [jobNr, setJobNr] = useState('')
    const [jobProj, setJobProj] = useState('')

    const addJob = async () => {
        const res = await addJobAXIOS({ equipment: equipment, model: model, quantityNeed: quantNeed, jobNumber: jobNr, jobProject: jobProj })
    }

    return (
        <div className="newJobMainDiv">
            <div>
                <div>
                    <input onChange={e => setEquipment(e.target.value)} placeholder="Equipment" type="text" name="" id="" />
                </div>
                <div>
                    <input onChange={e => setModel(e.target.value)} placeholder="Model" type="text" name="" id="" />
                </div>
                <div>
                    <input onChange={e => setQuantNeed(e.target.value)} placeholder="Quantity Need" type="text" name="" id="" />
                </div>
                <div>
                    <input onChange={e => setJobNr(e.target.value)} placeholder="Job Number" type="text" name="" id="" />
                </div>
                <div>
                    <input onChange={e => setJobProj(e.target.value)} placeholder="Job Project" type="text" name="" id="" />
                </div>
                <div>
                    <button onClick={e => addJob(e)}>Add Job</button>
                </div>
            </div>
        </div>
    )
}