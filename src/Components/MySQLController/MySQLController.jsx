import { newItemAXIOS } from "../../API/Axios/axios"
import { useEffect, useState } from "react"
import socket from '../../API/Socket/socket'
import "./MySQLController.css"
import { newProductionAXIOS, fetchProjectsAXIOS, fetchSOAXIOS, fetchEquipmentsAXIOS, newEquipAXIOS } from "../../API/Axios/axiosCS"

export default function MySQLController() {

    const [project, setProject] = useState('')
    const [so, setSO] = useState('')
    const [equipment, setEquipment] = useState('')
    const [codeA, setCodeA] = useState('')
    const [codeB, setCodeB] = useState(null)
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
    const [hipotValue, sethipotValue] = useState('')
    const [hipotModel, sethipotModel] = useState('')
    const [hipotMultimeterModel, sethipotMultimeterModel] = useState('')

    const [showNewProj, setShowNewProj] = useState(false)
    const [showNewSO, setShowNewSO] = useState(false)
    const [showNewEquip, setShowNewEquip] = useState(false)

    const [alert, setAlert] = useState('')


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
                'StartDate': fullDate,
                'EndDate': endDate,
                'hipotValue': hipotValue,
                'hipotModel': hipotModel,
                'hipotMultimeterModel': hipotMultimeterModel,
                'ww_number': workweek + '_' + yearDate
            })

            console.log("Success:", res.data);
            socketNewItem()
            setAlert('ok')
            setTimeout(() => {
                setAlert('')
            }, 1000);

        } catch (error) {
            console.log(error.request.response)
            console.error("Error:", error.res?.data || error.message);
            if ((error.request.response).includes('Duplicate')) {
                setAlert('duplicateB')
                setTimeout(() => {
                    setAlert('')
                }, 1000);
            }
            if ((error.request.response).includes('null')) {
                setAlert('null')
                setTimeout(() => {
                    setAlert('')
                }, 1000);
            }
        }
    }



    function socketNewItem() {
        socket.emit('socketNewItem', 'data')
        console.log('emit fetchprod')
    }

    const [projectArray, setProjectArray] = useState([])
    const [projectSearch, setProjectSearch] = useState('')
    const fetchProjects = async () => {
        const res = await fetchProjectsAXIOS({ project: projectSearch, country: '', proj_manager: '', client_name: '' })
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


    //DATE FORM
    const [dayDate, setDayDate] = useState('')
    const [monthDate, setMonthDate] = useState('')
    const [yearDate, setYearDate] = useState('')
    const [fullDate, setFullDate] = useState('')
    const [workweek, setWorkWeek] = useState('')

    const fullDateF = () => {
        setFullDate(dayDate + '-' + monthDate + '-' + yearDate)
    }

    useEffect(() => {
        fullDateF()
    }, [dayDate, monthDate, yearDate])

    const wwGenerator = () => {
        const date = new Date(yearDate, monthDate - 1, dayDate)
        const nearThursday = new Date(date.valueOf())
        nearThursday.setDate(nearThursday.getDate() + 3 - ((nearThursday.getDay() + 6) % 7))

        const firstThursday = new Date(nearThursday.getFullYear(), 0, 4)

        firstThursday.setDate(firstThursday.getDate() + 3 - ((firstThursday.getDay() + 6) % 7))

        const weekNumber = 1 + Math.round((nearThursday - firstThursday) / (7 * 24 * 60 * 60 * 1000))

        setWorkWeek(weekNumber)

        console.log('wwGenerator:', { weekNumber })
    }
    useEffect(() => { wwGenerator() }, [dayDate, monthDate, yearDate])


    useEffect(() => {
        fetchEquip()
    }, [projectSearch])

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
        fetchProjects()
        setTimeout(() => {
            fetchSO()
        }, 250);
        console.log('useeffectso')
    }, [projectSearch])
    console.log('SQLCTRL')

    return (
        <>
            <div className="mySqlControllerContent">
                <div>
                    <div>
                        <p style={{ fontSize: '12px', color: 'var(--light)' }}>{project === '' || null ? 'Project' : project}</p>
                        <input type="text" placeholder="project" onChange={e => setProjectSearch(e.target.value)} />
                        <select onChange={e => setProject(e.target.value)} name="" id="">
                            <option value=""></option>
                            {projectArray.map((e, key) =>
                                <option key={key} value={e.project}>{e.project}</option>
                            )
                            }
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        <p style={{ fontSize: '12px', color: 'var(--light)' }}>{so === '' || null ? 'SO' : so}</p>
                        <input type="text" placeholder="SO" onChange={e => setSO(e.target.value)} />
                        <select onChange={e => setSO(e.target.value)} name="" id="">
                            <option ></option>
                            {soArray.map((e, key) =>
                                <option key={key} value={e.sOref}>{e.sOref}</option>
                            )
                            }
                        </select>
                    </div>
                </div>
                {(project && so) == '' ? null :
                    <>
                        <div>
                            <div>
                                <p style={{ fontSize: '12px', color: 'var(--light)' }}>{equipment === '' || null ? 'Equipment' : equipment}</p>
                                <input type="text" placeholder="equipment" onChange={e => setEquipment(e.target.value)} />
                                <select onChange={e => setEquipment(e.target.value)} name="" id="">
                                    <option ></option>
                                    {equipArray.map((e, key) =>
                                        <option key={key} value={e.equipName}>{e.equipName}</option>
                                    )
                                    }
                                </select>
                            </div>
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div>
                            <p style={{ fontSize: '12px', color: 'var(--light)' }}>{codeA === '' || null ? 'Code A' : codeA}</p>
                            <input type="text" placeholder="codeA" onChange={e => setCodeA(e.target.value)} />
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', color: 'var(--light)' }}>{codeB === '' || null ? 'Code B' : codeB}</p>
                            <input style={alert === 'duplicateB' ? { backgroundColor: 'var(--red)' } : null} type="text" placeholder="codeB" onChange={e => setCodeB(e.target.value)} />
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', color: 'var(--light)' }}>{codePR === '' || null ? 'Code PR' : codePR}</p>
                            <input type="text" placeholder="codePR" onChange={e => setCodePR(e.target.value)} />
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', color: 'var(--light)' }}>{codePS === '' || null ? 'Code PS' : codePS}</p>
                            <input type="text" placeholder="codePS" onChange={e => setCodePS(e.target.value)} />
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', color: 'var(--light)' }}>{codeDR === '' || null ? 'Code DR' : codeDR}</p>
                            <input type="text" placeholder="codeDR" onChange={e => setCodeDR(e.target.value)} />
                        </div>
                        <div></div>
                        <div>
                            <p style={{ fontSize: '12px', color: 'var(--light)' }}>{type0 === '' || null ? 'Type 0' : type0}</p>
                            <select name="" id="" onChange={e => setType0(e.target.value)}>
                                <option value="">Start/Middle/End</option>
                                <option value="Start">Start</option>
                                <option value="Middle">Middle</option>
                                <option value="End">End</option>
                            </select>
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', color: 'var(--light)' }}>{type1 === '' || null ? 'Type 1' : type1}</p>
                            <select name="" id="" onChange={e => setType1(e.target.value)} >
                                <option value="">A/B</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                            </select>
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', color: 'var(--light)' }}>{type2 === '' || null ? 'Type 2' : type2}</p>
                            <select name="" id="" onChange={e => setType2(e.target.value)}>
                                <option value="">Standard/Hybrid/PRM</option>
                                <option value="Standard">Standard</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="PRM">PRM</option>
                            </select>
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', color: 'var(--light)' }}>{type3 === '' || null ? 'Type 3' : type3}</p>
                            <select name="" id="" onChange={e => setType3(e.target.value)}>
                                <option value="">IN/OUT</option>
                                <option value="IN">IN</option>
                                <option value="OUT">OUT</option>
                            </select>
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', color: 'var(--light)' }}>{type4 === '' || null ? 'Type 4' : type4}</p>
                            <select name="" id="" onChange={e => setType4(e.target.value)}>
                                <option value="">SCP/SBG/ABC</option>
                                <option value="ABC">ABC</option>
                                <option value="SCP">SCP</option>
                                <option value="SBG">SBG</option>
                            </select>
                        </div>
                        <div></div>
                        <div className="dateForm">
                            <div>
                                <p style={{ fontSize: '12px', color: 'var(--light)' }}>{startDate === '' || null ? 'Start Date' : startDate}</p>
                            </div>
                            <div>
                                <input type="text" placeholder="Day" onChange={e => setDayDate(e.target.value)} />
                            </div>
                            <div>
                                <select name="" id="" onChange={e => setMonthDate(e.target.value)} >
                                    <option value="">Month</option>
                                    <option value="1">Jan</option>
                                    <option value="2">Feb</option>
                                    <option value="3">Mar</option>
                                    <option value="4">Apr</option>
                                    <option value="5">May</option>
                                    <option value="6">Jun</option>
                                    <option value="7">Jul</option>
                                    <option value="8">Aug</option>
                                    <option value="9">Sep</option>
                                    <option value="10">Out</option>
                                    <option value="11">Nov</option>
                                    <option value="12">Dec</option>
                                </select>
                            </div>
                            <div>
                                <input type="text" placeholder="Year" onChange={e => setYearDate(e.target.value)} />
                            </div>
                            {/* <input type="date" placeholder="start date" onChange={e => setStartDate(e.target.value)} /> */}
                        </div>
                        <div className="hipotDiv">
                            <div>
                                <p style={{ fontSize: '12px', color: 'var(--light)' }}>Hipot</p>
                            </div>
                            <div>
                                <input type="text" placeholder="Hipot Value" onChange={e => sethipotValue(e.target.value)} />
                            </div>
                            <div>
                                <input type="text" placeholder="Hipot Model" onChange={e => sethipotModel(e.target.value)} />
                            </div>
                            <div>
                                <input type="text" placeholder="Hipot Multimeter Model" onChange={e => sethipotMultimeterModel(e.target.value)} />
                            </div>
                        </div>
                        <div className="wwDiv">
                            <div>
                                <p style={{ fontSize: '12px', color: 'var(--light)' }}>WorkWeek</p>
                            </div>
                        </div>
                        {/* <div>
                            <p style={{ fontSize: '12px', color: 'var(--light)' }}>{endDate === '' || null ? 'End Date' : endDate}</p>
                            <input type="text" placeholder="end date" onChange={e => setEndDate(e.target.value)} />
                        </div> */}
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div>
                            <button className="sendBtn" onClick={e => newItem(e)}>SEND</button>
                        </div>
                    </>
                }
                {
                    alert === 'ok' ?
                        <div style={{ color: 'var(--green)' }}>
                            Added successfully!
                        </div>
                        : null
                }
                {
                    alert === 'null' ?
                        <div style={{ color: 'var(--red)' }}>
                            You need B code!
                        </div>
                        : null
                }
            </div >

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
