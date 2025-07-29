import { useEffect, useState } from "react"
import { newProjectAXIOS, fetchProjectsAXIOS, deleteProjectAXIOS } from "../../../API/Axios/axiosCS"
import socket from "../../../API/Socket/socket"
import { getData } from "../../../CustomHooks/LocalStorage/GetData"
import "./Projects.css"

export default function Projects() {
    const [Project, setProject] = useState('')
    const [Country, setCountry] = useState('')
    const [Proj_manager, setProjManager] = useState('')
    const [Client_name, setClientName] = useState('')

    const [projectSearch, setProjectSearch] = useState('')
    const [countrySearch, setCountrySearch] = useState('')
    const [pmSearch, setPMSearch] = useState('')
    const [clientNameSearch, setClientNameSearch] = useState('')

    const [projectsArray, setProjectsArray] = useState([])

    const [alert0, setAlert0] = useState('')

    const [admin, setAdmin] = useState(0)
    const getAdmin = () => {
        const res = getData()
        setAdmin(res.admin)
    }

    useEffect(() => {
        getAdmin()
    }, [])

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
            if ((error.request.response).includes('Duplicate')) {
                setAlert0('Duplicate')
                setTimeout(() => {
                    setAlert0('')
                }, 1000);
            }
        }
    }

    const fetchProjects = async () => {
        const res = await fetchProjectsAXIOS({
            project: projectSearch,
            country: countrySearch,
            proj_manager: pmSearch,
            client_name: clientNameSearch
        })
        setProjectsArray(res.data)
        console.log(res)
    }

    const deleteBtn = async (e) => {
        const res = await deleteProjectAXIOS({ id_proj: e })
        console.log(res)
        socket.emit('newProject')
    }

    socket.on("fetchProject", () => {
        fetchProjects()
    })

    useEffect(() => {
        fetchProjects()
    }, [
        projectSearch,
        countrySearch,
        pmSearch,
        clientNameSearch
    ])

    return (
        <>
            <div className="pqaProjectsMainDiv" >
                <div className="pqaNewProject">
                    <div> <input onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            newProject()
                        }
                    }} style={alert0 === 'Duplicate' ? { backgroundColor: 'var(--red)' } : null} placeholder="Project" type="text" onChange={e => setProject(e.target.value)} /></div>
                    <div> <input onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            newProject()
                        }
                    }} placeholder="Country" type="text" onChange={e => setCountry(e.target.value)} /></div>
                    <div> <input onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            newProject()
                        }
                    }} placeholder="P. Manager" type="text" onChange={e => setProjManager(e.target.value)} /></div>
                    <div> <input onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            newProject()
                        }
                    }} placeholder="Client" type="text" onChange={e => setClientName(e.target.value)} /></div>
                    <div> <button className="sendBtn" onClick={e => newProject(e)}>Add Project</button></div>
                </div>

                <div className="pqaListProjects">
                    <div style={admin === 0 ? null : { gridTemplateColumns: 'repeat(5, calc(100%/5))' }} className="pqaListHeadersProjects">
                        <div>
                            Project Name
                            <input type="text" placeholder="Search by project" onChange={e => setProjectSearch(e.target.value)} />
                        </div>
                        <div>
                            Country
                            <input type="text" placeholder="Search by country" onChange={e => setCountrySearch(e.target.value)} />
                        </div>
                        <div>
                            Project Manager
                            <input type="text" placeholder="Search by pm" onChange={e => setPMSearch(e.target.value)} />
                        </div>
                        <div>
                            Client Name
                            <input type="text" placeholder="Search by client name" onChange={e => setClientNameSearch(e.target.value)} />
                        </div>
                    </div>

                    {projectsArray.map((e, key) =>
                        <div key={e.id_proj} style={admin === 0 ? null : { gridTemplateColumns: 'repeat(5, calc(100%/5))' }} >
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
                            {admin === 0 ? null :
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <span onClick={a => deleteBtn(e.id_proj)}>Delete</span>
                                        {/* <span onClick={updateBtn}>update</span> */}
                                    </div>
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}