import { useState } from "react"
import { newProjectAXIOS } from "../../../API/Axios/axiosCS"
import socket from "../../../API/Socket/socket"

export default function NewProject() {

    const [Project, setProject] = useState('')
    const [Country, setCountry] = useState('')
    const [Proj_manager, setProjManager] = useState('')
    const [Client_name, setClientName] = useState('')

    const newProject = async () => {
        socket.emit("newProject")
        console.log('newproject')
        try { 
            const res = await newProjectAXIOS({
                'Project': Project,
                'Country': Country,
                'Proj_manager': Proj_manager,
                'Client_name': Client_name
            })
            console.log(res.data)
        } catch (error) {
            console.error("Error:", error.res?.data || error.message);
        }
    }

    return (
        <>
            <input placeholder="Project" type="text" onChange={e => setProject(e.target.value)} />
            <input placeholder="Country" type="text" onChange={e => setCountry(e.target.value)} />
            <input placeholder="P. Manager" type="text" onChange={e => setProjManager(e.target.value)} />
            <input placeholder="Client" type="text" onChange={e => setClientName(e.target.value)} />
            <button className="sendBtn" onClick={e => newProject(e)}>Add Project</button>
        </>
    )
}