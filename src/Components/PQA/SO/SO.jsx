import { useEffect, useState } from "react"
import { newSOAXIOS, fetchSOAXIOS, fetchProjectsAXIOS } from "../../../API/Axios/axiosCS"
import socket from "../../../API/Socket/socket"
import './SO.css'


export default function So() {

    const [SOref, setSOref] = useState('')
    const [project, setProject] = useState('')

    const newSO = async () => {
        socket.emit("newSO")
        console.log('newSO')
        try {
            const res = await newSOAXIOS({
                'SOref': SOref,
                'project': project
            })
            console.log(res.data)
        } catch (error) {
            console.error("Error:", error.res?.data || error.message);
        }
    }

    const [projectArray, setProjectArray] = useState([])
    const fetchProjects = async () => {
        const res = await fetchProjectsAXIOS({
            project: projectSearch,
            country: '',
            proj_manager: '',
            client_name: ''
        })
        console.log(res)
        setProjectArray(res.data)
    }

    const [soArray, setSoArray] = useState([])
    const [projectSearch, setProjectSearch] = useState('')
    const [soSearch, setSoSearch] = useState('')
    const fetchSO = async () => {
        const res = await fetchSOAXIOS({ project: projectSearch, SOref: soSearch })
        setSoArray(res.data)
        console.log(res)
    }

    socket.on('fetchSO', () => {
        fetchSO()
    })

    useEffect(() => {
        fetchProjects()
        fetchSO()
    }, [projectSearch, soSearch])

    return (
        <>
            <div className="pqaSoMainDiv">
                <div className="pqaNewSo">
                    <div>
                        <select name="" id="" placeholder='Project' onChange={e => setProject(e.target.value)}>
                            <option value="">Project</option>
                            {projectArray.map((e, key) =>
                                <option value={e.project}>
                                    {e.project}
                                </option>
                            )}
                        </select>
                    </div>

                    <div>
                        <input placeholder="SO ref" type="text" onChange={e => setSOref(e.target.value)} />
                    </div>
                    {/* <input placeholder="Project" type="text" onChange={e => setProject(e.target.value)} /> */}
                    <div>
                        <button className="sendBtn" onClick={e => newSO(e)}>Add SO</button>
                    </div>
                </div>
                <div className="pqaListSo">
                    <div className="pqaListSoHeaders">
                        <div>
                            Project
                            <input type="text" name="" id="" onChange={e => setProjectSearch(e.target.value)} />
                        </div>
                        <div>
                            SO number
                            <input type="text" name="" id="" onChange={e => setSoSearch(e.target.value)} />
                        </div>
                    </div>
                    {soArray.map((e, key) =>
                        <div>
                            <div>
                                {e.project}
                            </div>
                            <div>
                                {e.sOref}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}