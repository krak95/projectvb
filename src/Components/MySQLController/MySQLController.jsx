import { newItemAXIOS } from "../../API/Axios/axios"
import { useEffect, useState, useRef, use } from "react"
import socket from '../../API/Socket/socket'
import "./MySQLController.css"
import { newProductionAXIOS, fetchProjectsAXIOS, fetchSOAXIOS, fetchEquipmentsAXIOS } from "../../API/Axios/axiosCS"
import NewProject from "./NewProject/NewProject"
import NewSO from "./NewSO/NewSO"
import NewEquip from "./NewEquip/NewEquip"

export default function MySQLController() {

    const [project, setProject] = useState('')
    const [so, setSO] = useState('')
    const [equipment, setEquipment] = useState('')
    const [codeA, setCodeA] = useState('')
    const [codeB, setCodeB] = useState('')
    const [codePR, setCodePR] = useState('')
    const [codePS, setCodePS] = useState('')
    const [codeDR, setCodeDR] = useState('')
    const [type0, setType0] = useState('')
    const [type1, setType1] = useState('')
    const [type2, setType2] = useState('')
    const [type3, setType3] = useState('')
    const [type4, setType4] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [showNewProj, setShowNewProj] = useState(false)
    const [showNewSO, setShowNewSO] = useState(false)
    const [showNewEquip, setShowNewEquip] = useState(false)


    const newItem = async () => {
        try {
            const res = await newProductionAXIOS({
                'Project': project,
                'So': so,
                'Equipment': equipment,
                'CodeA': codeA,
                'CodeB': codeB,
                'CodePR': codePR,
                'CodePS': codePS,
                'CodeDR': codeDR,
                'Type0': type0,
                'Type1': type1,
                'Type2': type2,
                'Type3': type3,
                'Type4': type4,
                'ReadyPQA': null,
                'Tester': JSON.parse(localStorage.getItem('User')).fullname,
                'StartDate': startDate,
                'EndDate': endDate
            })

            console.log("Success:", res.data);
            socketNewItem()
        } catch (error) {
            console.error("Error:", error.res?.data || error.message);
        }
    }

    function socketNewItem() {
        socket.emit('socketNewItem', 'data')
        console.log('emit fetchprod')
    }

    const [projectArray, setProjectArray] = useState([])
    const fetchProjects = async () => {
        const res = await fetchProjectsAXIOS({ project: '' })
        setProjectArray(res.data)
        console.log(soArray)
    }

    const [soArray, setSoArray] = useState([])
    const fetchSO = async () => {
        const res = await fetchSOAXIOS({ project, SOref: '' })
        setSoArray(res.data)
        console.log(res)
    }
    const [equipArray, setEquipArray] = useState([])
    const fetchEquip = async () => {
        const res = await fetchEquipmentsAXIOS({ EquipName: equipment })
        setEquipArray(res.data)
        console.log(res)
    }



    useEffect(() => {
        fetchEquip()
    }, [equipment])
    useEffect(() => {
        fetchProjects()
        socket.on("fetchProject", () => {
            console.log("socket fetchequips")
            fetchProjects()
        })
        socket.on("fetchSO", () => {
            console.log("socket fetchequips")
            fetchSO()
        })
        socket.on("fetchEquips", () => {
            console.log("socket fetchequips")
            fetchEquip()
        })
    }, [])
    useEffect(() => {
        setSoArray([])
        setSO('')
        setTimeout(() => {
            fetchSO()
        }, 250);
        console.log('useeffectso')
    }, [project])
    console.log('SQLCTRL')

    return (
        <>
            <div className="mySqlControllerContent">
                <div>
                    <div>
                        <input type="text" placeholder="project" onChange={e => setProject(e.target.value)} />

                        <select onChange={e => setProject(e.target.value)} name="" id="">
                            <option value=""></option>

                            {projectArray.map((e, key) =>

                                <option key={key} value={e.project}>{e.project}</option>

                            )
                            }
                        </select>
                        <button className="openBtn" onClick={e => setShowNewProj(!showNewProj)}>+</button>
                        {
                            showNewProj === false ? null : <NewProject />
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <input type="text" placeholder="so" value={so} onChange={e => setSO(e.target.value)} />
                        <select onChange={e => setSO(e.target.value)} name="" id="">
                            <option ></option>
                            {soArray.map((e, key) =>
                                <option key={key} value={e.sOref}>{e.sOref}</option>
                            )
                            }
                        </select>
                        <button className="openBtn" onClick={e => setShowNewSO(!showNewSO)}>+</button>
                        {
                            showNewSO === false ? null : <NewSO />
                        }
                    </div>
                </div>
                {(project && so) == '' ? null :
                    <>
                        <div>
                            <input type="text" value={equipment} placeholder="equipment" onChange={e => setEquipment(e.target.value)} />
                            <select onChange={e => setEquipment(e.target.value)} name="" id="">
                                <option ></option>
                                {equipArray.map((e, key) =>
                                    <option key={key} value={e.equipName}>{e.equipName}</option>
                                )
                                }
                            </select>
                            <button className="openBtn" onClick={e => setShowNewEquip(!showNewEquip)}>+</button>
                            {
                                showNewEquip === false ? null : <NewEquip />
                            }
                        </div>
                        <div>
                            <input type="text" placeholder="codeA" onChange={e => setCodeA(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" placeholder="codeB" onChange={e => setCodeB(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" placeholder="codePR" onChange={e => setCodePR(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" placeholder="codePS" onChange={e => setCodePS(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" placeholder="codeDR" onChange={e => setCodeDR(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" placeholder="type0" onChange={e => setType0(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" placeholder="type1" onChange={e => setType1(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" placeholder="type2" onChange={e => setType2(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" placeholder="type3" onChange={e => setType3(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" placeholder="type4" onChange={e => setType4(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" placeholder="start date" onChange={e => setStartDate(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" placeholder="end date" onChange={e => setEndDate(e.target.value)} />
                        </div>
                    </>
                }
                <div>
                    <button className="sendBtn" onClick={newItem}>SEND</button>
                </div>
            </div>

            {/* 
    datet,
            fw_version,
            type0,
            type1,
            type2,
            type3,
            type4,
        */}
        </>
    )
}
