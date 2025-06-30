import { useEffect, useState } from "react"
import { newProjectAXIOS, fetchProjectsAXIOS } from "../../../API/Axios/axiosCS"
import socket from "../../../API/Socket/socket"
import "./Projects.css"

export default function Projects() {
    const [Project, setProject] = useState('')
    const [Country, setCountry] = useState('')
    const [Proj_manager, setProjManager] = useState('')
    const [Client_name, setClientName] = useState('')

    const [projectsArray, setProjectsArray] = useState([])

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

    const fetchProjects = async () => {
        const res = await fetchProjectsAXIOS({ project: '' })
        setProjectsArray(res.data)
        console.log(res)
    }

    socket.on("fetchProject", () => {
        fetchProjects()
    })
    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <>
            <div className="pqaProjectsMainDiv">

                <div className="pqaNewProject">
                    <input placeholder="Project" type="text" onChange={e => setProject(e.target.value)} />
                    <input placeholder="Country" type="text" onChange={e => setCountry(e.target.value)} />
                    <input placeholder="P. Manager" type="text" onChange={e => setProjManager(e.target.value)} />
                    <input placeholder="Client" type="text" onChange={e => setClientName(e.target.value)} />
                    <button className="sendBtn" onClick={e => newProject(e)}>Add Project</button>
                </div>

                <div className="pqaListProjects">
                    <div className="pqaListHeadersProjects">
                        <div>Project Name</div>
                        <div>Country</div>
                        <div>Project Manager</div>
                        <div>Client Name</div>
                    </div>
                    {projectsArray.map((e, key) =>
                        <div>
                            <div>
                                {e.project}
                            </div>
                            <div>
                                {e.country}
                            </div>
                            <div>
                                {e.proj_manager}
                            </div>
                            <div>
                                {e.client_name}
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </>
    )
}