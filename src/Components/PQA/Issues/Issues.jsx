import { useEffect, useState } from "react"
import "./Issues.css"
import { newIssueAXIOS, fetchIssuesAXIOS, deleteIssuesAXIOS } from "../../../API/Axios/axiosCS"
import socket from "../../../API/Socket/socket"
import { getData } from "../../../CustomHooks/LocalStorage/GetData"

export default function Issues() {
    const [issueRef, setIssueRef] = useState('')
    const [issueDescription, setIssueDescription] = useState('')
    const [issueLevel, setIssueLevel] = useState('')
    const [issuesArray, setIssuesArray] = useState([])

    const [admin, setAdmin] = useState(0)
    const getAdmin = () => {
        const res = getData()
        setAdmin(res.admin)
    }

    useEffect(() => {
        getAdmin()
    }, [])

    const newIssue = async () => {
        socket.emit("newIssue")
        const res = await newIssueAXIOS({ ref_issue: issueRef, description_issue: issueDescription, level_issue: issueLevel })
        console.log(res)
    }

    const deleteBtn = async (e) => {
        const res = await deleteIssuesAXIOS({ id_issues: e })
        console.log(res)
        socket.emit('newIssue')
    }

    const [IssueRef, setIssueRefSearch] = useState('')
    const [IssueDescrSearch, setIssueDescrSearch] = useState('')
    const [IssueLevelSearch, setIssueLevelSearch] = useState('')

    const fetchIssues = async () => {
        const res = await fetchIssuesAXIOS({ ref_issue: IssueRef, description_issue: IssueDescrSearch, level_issue: IssueLevelSearch })
        setIssuesArray(res.data)
    }
    socket.on("fetchIssues", () => {
        fetchIssues()
    })
    useEffect(() => {
        fetchIssues()
    }, [
        IssueRef,
        IssueDescrSearch,
        IssueLevelSearch
    ])


    return (
        <>
            <div className="issuesMainDiv">
                <div className="issueNewDiv">
                    <div>
                        <input placeholder="Ref" type="text" onChange={e => setIssueRef(e.target.value)} />
                    </div>
                    <div>
                        <input placeholder="Description" type="text" onChange={e => setIssueDescription(e.target.value)} />
                    </div>
                    <div>
                        <select name="" id="" onChange={e => setIssueLevel(e.target.value)}>
                            <option value="">Issue Classification</option>
                            <option value="Minor">Minor</option>
                            <option value="Trivial">Trivial</option>
                            <option value="Major">Major</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>
                    <div>
                        <button onClick={newIssue}>New Issue</button>
                    </div>
                </div>
                <div className="issuesList">
                    <div className="issuesListHeaders" style={admin === 0 ? null : { gridTemplateColumns: 'repeat(4, calc(100%/4))' }}>
                        <div>Issue Ref
                            <input placeholder="Search by issue ref" type="text" onChange={e => setIssueRefSearch(e.target.value)} name="" id="" />
                        </div>
                        <div>Issue Description
                            <input type="text" placeholder="Search by issue description" onChange={e => setIssueDescrSearch(e.target.value)} name="" id="" />
                        </div>
                        <div>Issue Level
                            <input type="text" placeholder="Search by issue level" onChange={e => setIssueLevelSearch(e.target.value)} name="" id="" />
                        </div>
                    </div>

                    {issuesArray.map((e, key) =>
                        <div style={admin === 0 ? null : { gridTemplateColumns: 'repeat(4, calc(100%/4))' }} key={key} className="issuesListContent">
                            <div>{e.ref_issue}</div>
                            <div>{e.description_issue}</div>
                            <div>{e.level_issue}</div>
                            {admin === 0 ? null :
                                <div onClick={a => deleteBtn(e.id_issues)}>
                                    <span>Delete</span>
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}