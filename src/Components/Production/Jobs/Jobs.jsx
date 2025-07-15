import NewJob from "./NewJob";
import { fetchJobAXIOS } from "../../../API/Axios/axiosCS";
import { useEffect, useState } from "react";
import "./Jobs.css"
export default function Jobs() {

    const [jobArray, setJobArray] = useState([])

    const [equipmentSearch, setEquipmentSearch] = useState('')
    const [modelSearch, setModelSearch] = useState('')
    const [jobNrSearch, setJobNrSearch] = useState('')
    const [jobProjSearch, setJobProjSearch] = useState('')
    const [jobDoneSearch, setJobDoneSearch] = useState(0)

    const fetchJob = async () => {
        try {

            const res = await fetchJobAXIOS({ equipment: equipmentSearch, model: modelSearch, jobNumber: jobNrSearch, jobProject: jobProjSearch, jobDone: jobDoneSearch })
            console.log(res)
            setJobArray(res.data)
        } catch (e) {
            console.log(e)
            setJobDoneSearch(0)
        }
    }



    useEffect(() => {
        fetchJob()
    }, [
        equipmentSearch,
        modelSearch,
        jobNrSearch,
        jobProjSearch,
        jobDoneSearch
    ])

    return (
        <>
            <NewJob />
            <div className="jobsMainDiv">
                <div className="jobsList">
                    <div className="jobsListHeaders" >
                        <div>
                            Project
                            <input type="text" name="" id="" onChange={e => setJobProjSearch(e.target.value)} />
                        </div>
                        <div>
                            Job Number
                            <input type="text" name="" id="" onChange={e => setJobNrSearch(e.target.value)} />
                        </div>
                        <div>
                            Equipment
                            <input type="text" name="" id="" onChange={e => setEquipmentSearch(e.target.value)} />
                        </div>
                        <div>
                            Model
                            <input type="text" name="" id="" onChange={e => setModelSearch(e.target.value)} />
                        </div>
                        <div>
                            Job Status
                            <input type="text" name="" id="" onChange={e => setJobDoneSearch(e.target.value)} />
                        </div>
                    </div>
                    {jobArray.map((e, key) =>
                        <div >
                            <div>
                                {e.jobProject}
                            </div>
                            <div>
                                {e.jobNumber}
                            </div>
                            <div>
                                {e.equipment}
                            </div>
                            <div>
                                {e.model}
                            </div>
                            <div>
                                {e.jobDone}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}