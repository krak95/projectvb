import { useEffect, useState } from "react"
import { newSOAXIOS, fetchProjectsAXIOS } from "../../../API/Axios/axiosCS"
import socket from "../../../API/Socket/socket"


export default function NewSO() {

    const [SOref, setSOref] = useState('')
    const [project, setProject] = useState('')

    const newSO = async () => {
        socket.emit("newSO")
        console.log('newproject')
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
        const res = await fetchProjectsAXIOS({ project: '' })
        setProjectArray(res.data)
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <>
                <input placeholder="SO ref" type="text" onChange={e => setSOref(e.target.value)} />
                <input placeholder="Project" type="text" onChange={e => setProject(e.target.value)} />
                <select name="" id="" onChange={e => setProject(e.target.value)}>
                    {projectArray.map((e, key) =>
                        <option value={e.project}>
                            {e.project}
                        </option>
                    )}
                </select>
                <button className="sendBtn" onClick={e => newSO(e)}>Add SO</button>
        </>
    )
}