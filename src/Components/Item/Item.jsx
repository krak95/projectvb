import './Item.css'
import { deleteItemIssueAXIOS, delProdAXIOS, fetchIssuesAXIOS, updateItemAXIOS, addItemIssueAXIOS, updateChecklistAXIOS, updateDeploymentAXIOS, updateTraceabilityAXIOS, fetchProdIDAXIOS, updateStatusAXIOS, fetchItemIssuesAXIOS, checkProductionAXIOS, updateItemIssueStatusAXIOS } from "../../API/Axios/axiosCS"
// import { fetchItemsAXIOS } from '../../API/Axios/axios'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import socket from '../../API/Socket/socket'
import { datefunction } from '../../CustomHooks/Date/Date'
import { checkLogin } from '../../CustomHooks/Login/LoginHook'
import GlobalContent from '../../GLOBAL/Global'
import { setData } from '../../CustomHooks/LocalStorage/StoreData'
import { useContext } from 'react'
import truelogo from "./../../Img/true.png"
import falselogo from "./../../Img/false.png"
import { NavLink } from 'react-router-dom'

export default function Item({ path }) {
    const { authorizing } = useContext(GlobalContent);
    const [items, setItems] = useState([])

    const [alert0, setAlert0] = useState('')

    const navigate = useNavigate();

    const handleRetro = () => {
        try {
            window.location.href = 'http://10.76.76.44:3000/' + path + ''
        } catch (e) {
            console.log(e)
        }
    };

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const id_prod = queryParams.get('id_prod');
    const project = queryParams.get('project');
    const so = queryParams.get('so');
    const equip = queryParams.get('equip');
    const codeA = queryParams.get('codeA');
    const codeB = queryParams.get('codeB');
    const codePR = queryParams.get('codePR');
    const codePS = queryParams.get('codePS');
    const codeDR = queryParams.get('codeDR');
    const type0 = queryParams.get('type0');
    const type1 = queryParams.get('type1');
    const type2 = queryParams.get('type2');
    const type3 = queryParams.get('type3');
    const type4 = queryParams.get('type4');
    const tester = queryParams.get('tester');
    const startDate = queryParams.get('startDate');
    const endDate = queryParams.get('endDate');
    const hipotValue = queryParams.get('hipotValue');
    const hipotModel = queryParams.get('hipotModel');
    const hipotMultimeterModel = queryParams.get('hipotMultimeterModel');
    const ww_number = queryParams.get('ww_number');


    const [comment, setComment] = useState('')
    const addItemIssue = async () => {
        try {

            const res = await addItemIssueAXIOS({ id_issue: ref_issue, id_item: id_prod, comment: comment })
            console.log(res.data)
            socketAddItemIssue()
        } catch (e) {
            setTimeout(() => {
                setAlert0('')
            }, 1000);
            setAlert0('missingRef')
            console.log(e)
        }
    }

    const [ref_issue, setRef_Issue] = useState('')
    const [issueArray, setIssueArray] = useState([])
    const [itemIssuesArray, setItemIssuesArray] = useState([])
    const [issueSearch, setIssueSearch] = useState('')

    const fetchItemIssues = async () => {
        const res = await fetchItemIssuesAXIOS({ id_item: id_prod })
        console.log(res.data)
        setItemIssuesArray(res.data)
        if ((res.data).length > 0) {
            const res2 = (res.data).some((e, key) => e.issue_status === "OPEN")
            console.log(res2)
            setFinishProcess(res2)
        } else {
            setFinishProcess('empty')
        }
    }

    const fetchIssues = async () => {
        const res = await fetchIssuesAXIOS({ ref_issue: '', description_issue: issueSearch, level_issue: '' })
        console.log(res.data)
        setIssueArray(res.data)
    }


    const checkProduction = async () => {
        console.log('prod fetch asunc',)
        try {
            const res = await checkProductionAXIOS({
                'id_prod': id_prod
            })
            setItems(res.data)
            console.log(res.data)
            if (res.data.length === 0) {
                setAlert0('NotExist')
                return
            } else {
                console.log('setItemsCheck')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const updateStatus = async () => {
        var status
        var endDate = datefunction()
        console.log('finishprocess: ', finishProcess)
        if (finishProcess === true) {
            status = 'nok'
        }
        else if (checklist1 !== 'true' || deployment1 !== 'true' || traceability1 !== 'true') {
            status = 'Waiting Documentation'
        }
        else if (finishProcess === false) {
            status = 'fixed'
        }
        else if (checklist1 === 'true' && deployment1 === 'true' && traceability1 === 'true') {
            status = 'ok'
        }
        var id_prod = items[0].id_prod
        console.log({ id_prod, status })
        try {
            const res = await updateStatusAXIOS({ id_prod, status, endDate: endDate })
            socket.emit('socketNewItem')
            checkProduction()
            handleRetro()
            socketRefreshItemStatus()
            console.log(res)
            //update JOBS table quantityDone
        } catch (e) {
            console.log(e)
        }
        console.log(items[0].status)
    }

    const [action, setAction] = useState('')
    const updateItemIssueStatus = async (e) => {
        var statusf
        if (itemIssuesArray[e.key].issue_status === 'CLOSE') {
            statusf = 'OPEN'
        } else {
            statusf = 'CLOSE'
        }
        // console.log({ itemIssuesArray[key], key: e.key })
        // console.log({ iditem_issues: e.iditem_issues, issue_status: e.key })
        try {
            const res = await updateItemIssueStatusAXIOS({ iditem_issues: itemIssuesArray[e.key].iditem_issues, issue_status: statusf, action: action })
            socketAddItemIssue()
        } catch (e) {
            console.log(e)
        }
    }

    const [finishProcess, setFinishProcess] = useState('')

    const delProd = async () => {
        const res = await checkLogin()
        console.log(res)
        if (res != 0) {
            console.log(res)
            authorizing(1)
            if (window.confirm("Delete item?") === true) {
                console.log(id_prod)
                const res = await delProdAXIOS({ id_prod, tester: JSON.parse(localStorage.getItem('User')).fullname })
                console.log(res)
                socketNewItem()
                if (res.data === 0) {
                    alert('You cannot delete this item!')
                } else {
                    navigate(-1)
                }
            }
        } else {
            setData({ username: '', token: '', fullname: '' })
            authorizing(0)
        }
    }

    const deleteItemIssue = async (e) => {
        if (window.confirm('Delete Issue?') === true) {
            const res = await deleteItemIssueAXIOS({ e })
            socketAddItemIssue()
            console.log(res)
            console.log(e)
        }
    }

    const fetchProdID = async () => {
        const res = await fetchProdIDAXIOS({ id_prod: id_prod })
        console.log(res.data)
        setChecklist1(res.data[0]?.checklistStatus)
        setDeployment1(res.data[0]?.deploymentStatus)
        setTraceability1(res.data[0]?.traceabilityStatus)
        socketNewItem()
    }

    const [checklist1, setChecklist1] = useState('')

    const [deployment1, setDeployment1] = useState('')

    const [traceability1, setTraceability1] = useState('')

    const [checklist, setChecklist] = useState(checklist1)

    const [deployment, setDeployment] = useState(deployment1)

    const [traceability, setTraceability] = useState(traceability1)

    const updateItem = async () => {
        try {

            const res = await updateItemAXIOS(
                {
                    id_prod: id_prod,
                    project: (projectup === '' ? items[0].project : projectup),
                    so: (soup === '' ? items[0].so : soup),
                    equipment: (equipmentup === '' ? items[0].equipment : equipmentup),
                    codeA: (codeAup === '' ? items[0].codeA : codeAup),
                    codeB: (codeBup === '' ? items[0].codeB : codeBup),
                    codePR: (codePRup === '' ? items[0].codePR : codePRup),
                    codePS: (codePSup === '' ? items[0].codePS : codePSup),
                    codeDR: (codeDRup === '' ? items[0].codeDR : codeDRup),
                    type0: (type0up === '' ? items[0].type0 : type0up),
                    type1: (type1up === '' ? items[0].type1 : type1up),
                    type2: (type2up === '' ? items[0].type2 : type2up),
                    type3: (type3up === '' ? items[0].type3 : type3up),
                    type4: (type4up === '' ? items[0].type4 : type4up),
                    tester: (testerup === '' ? items[0].tester : testerup),
                    startDate: (startDateup === '' ? items[0].startDate : startDateup),
                    endDate: (endDateup === '' ? items[0].endDate : endDateup),
                    hipotValue: (hipotValueup === '' ? items[0].hipotValue : hipotValueup),
                    hipotModel: (hipotModelup === '' ? items[0].hipotModel : hipotModelup),
                    hipotMultimeterModel: (hipotMultimeterModelup === '' ? items[0].hipotMultimeterModel : hipotMultimeterModelup),
                    ww_number: (workweek === '' ? items[0].ww_number : (workweek.toString() + '_' + yearDate)),
                    comment: (commentup === '' ? items[0].comment : commentup)
                })
            console.log(res)
            checkProduction()
            socket.emit('socketAddItemIssue')
        } catch (e) {
            console.log(e)
        }
    }

    const [updateDiv, showUpdateDiv] = useState(false)

    const [projectup, setprojectup] = useState('')
    const [soup, setsoup] = useState('')
    const [equipmentup, setequipmentup] = useState('')
    const [codeAup, setcodeAup] = useState('')
    const [codeBup, setcodeBup] = useState('')
    const [codePRup, setcodePRup] = useState('')
    const [codePSup, setcodePSup] = useState('')
    const [codeDRup, setcodeDRup] = useState('')
    const [type0up, settype0up] = useState('')
    const [type1up, settype1up] = useState('')
    const [type2up, settype2up] = useState('')
    const [type3up, settype3up] = useState('')
    const [type4up, settype4up] = useState('')
    const [testerup, settesterup] = useState('')
    const [startDateup, setstartDateup] = useState('')
    const [endDateup, setendDateup] = useState('')
    const [hipotValueup, sethipotValueup] = useState('')
    const [hipotModelup, sethipotModelup] = useState('')
    const [hipotMultimeterModelup, sethipotMultimeterModelup] = useState('')
    const [ww_numberup, setww_numberup] = useState('')

    const [commentup, setcommentup] = useState('')

    const updateChecklist = async (e) => {
        console.log(e)
        try {
            const res = await updateChecklistAXIOS({ id_prod, checklist: e })
            socket.emit('socketAddItemIssue')
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }
    const updateDeployment = async (e) => {
        try {
            const res = await updateDeploymentAXIOS({ id_prod, deployment: e })
            console.log(res)
            socket.emit('socketAddItemIssue')
        } catch (e) {
            console.log(e)
        }
    }
    const updateTraceability = async (e) => {
        try {
            const res = await updateTraceabilityAXIOS({ id_prod, traceability: e })
            socket.emit('socketAddItemIssue')
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    function socketNewItem() {
        socket.emit('socketNewItem', 'data')
        console.log('emit fetchprod')
    }

    function socketAddItemIssue() {
        socket.emit('socketAddItemIssue')
    }

    function socketRefreshItemStatus() {
        socket.emit('socketNewItem')
    }
    useEffect(() => {
        fetchProdID()
    }, [])

    useEffect(() => {
        console.log('useeffect itemjsx', codeA)
        checkProduction()
        fetchItemIssues()
        socket.on('socketFetchItemIssue', () => {
            fetchProdID()
            fetchItemIssues()
            checkProduction()
        })
        // alert0('item', project, so, codeA, codeB)
    }, [])


    //END DATE FORM
    const [dayDate, setDayDate] = useState('')
    const [monthDate, setMonthDate] = useState('')
    const [yearDate, setYearDate] = useState('')
    const [workweek, setWorkWeek] = useState('')

    const fullDateF = () => {
        setstartDateup(dayDate + '-' + monthDate + '-' + yearDate)
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

    //START DATE FORM
    const [startdayDate, setStartDayDate] = useState('')
    const [startmonthDate, setStartMonthDate] = useState('')
    const [startyearDate, setStartYearDate] = useState('')

    const fullDateStartF = () => {
        setstartDateup(startdayDate + '-' + startmonthDate + '-' + startyearDate)
    }

    useEffect(() => {
        fullDateStartF()
    }, [startdayDate, startmonthDate, startyearDate])

    useEffect(() => {
        fetchIssues()
    }, [issueSearch])

    return (
        <>
            <div className="itemContentDiv">
                {alert0 !== 'NotExist' ? <div className='itemInfo'>
                    <div className='itemPageHeader'>
                        <button className='backBtn' onClick={handleRetro}>Back</button>
                        <div>
                            <div>
                                Tested by: <p>{tester}</p>
                            </div>
                            <div>
                                <p>Week {
                                    items[0]?.ww_number > 9 ?
                                        (items[0]?.ww_number)?.slice(0, 2)
                                        :
                                        (items[0]?.ww_number)?.slice(0, 1)


                                }</p>
                            </div>
                            <div>
                                <p>{items[0]?.startDate}</p> until <p>{items[0]?.endDate === '' ? 'Not finished' : items[0]?.endDate}</p>
                            </div>
                        </div>
                        <button className='deleteItemBtn' onClick={delProd}>Delete product</button>
                    </div>
                    <div className='itemHeaders'>
                        <div onClick={e => showUpdateDiv(!updateDiv)} className='itemHeadersUpdate'>
                            UPDATE
                        </div>
                        <div style={updateDiv === false ? { display: 'none' } : null} className='updateItemDiv'>
                            <div>

                                <div>
                                    <input onChange={e => setprojectup(e.target.value)} placeholder='project' type="text" name="" id="" />
                                </div>
                                <div>
                                    <input onChange={e => setsoup(e.target.value)} placeholder='so' type="text" name="" id="" />
                                </div>
                                <div>
                                    <input onChange={e => setequipmentup(e.target.value)} placeholder='equipment' type="text" name="" id="" />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input onChange={e => setcodeAup(e.target.value)} placeholder='codeA' type="text" name="" id="" />
                                </div>
                                <div>
                                    <input onChange={e => setcodeBup(e.target.value)} placeholder='codeB' type="text" name="" id="" />
                                </div>
                                <div>
                                    <input onChange={e => setcodePRup(e.target.value)} placeholder='codePR' type="text" name="" id="" />
                                </div>
                                <div>
                                    <input onChange={e => setcodePSup(e.target.value)} placeholder='codePS' type="text" name="" id="" />
                                </div>
                                <div>
                                    <input onChange={e => setcodeDRup(e.target.value)} placeholder='codeDR' type="text" name="" id="" />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <select onChange={e => settype0up(e.target.value)} name="" id="">
                                        <option value="Start">Start</option>
                                        <option value="Middle">Middle</option>
                                        <option value="End">End</option>
                                    </select>
                                </div>
                                <div>
                                    <select onChange={e => settype1up(e.target.value)} name="" id="">
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                    </select>
                                </div>
                                <div>
                                    <select onChange={e => settype2up(e.target.value)} name="" id="">
                                        <option value="Standard">Standard</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="PRM">PRM</option>
                                    </select>
                                </div>
                                <div>
                                    <select onChange={e => settype3up(e.target.value)} name="" id="">
                                        <option value="IN">IN</option>
                                        <option value="OUT">OUT</option>
                                    </select>
                                </div>
                                <div>
                                    <select onChange={e => settype4up(e.target.value)} name="" id="">
                                        <option value="SCP">SCP</option>
                                        <option value="SBG">SBG</option>
                                        <option value="ABC">ABC</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input onChange={e => settesterup(e.target.value)} placeholder='tester' type="text" name="" id="" />
                                </div>

                            </div>
                            <div>
                                <div>
                                    <input onChange={e => sethipotValueup(e.target.value)} placeholder='hipotValue' type="text" name="" id="" />
                                </div>
                                <div>
                                    <input onChange={e => sethipotModelup(e.target.value)} placeholder='hipotModel' type="text" name="" id="" />
                                </div>
                                <div>
                                    <input onChange={e => sethipotMultimeterModelup(e.target.value)} placeholder='hipotMultimeterModel' type="text" name="" id="" />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>
                                        Start Date
                                    </div>
                                    <div>
                                        <input onChange={e => setStartDayDate(e.target.value)} placeholder='day' type="text" name="" id="" />
                                    </div>
                                    <div>
                                        <select name="" id="" onChange={e => setStartMonthDate(e.target.value)} >
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
                                    <input onChange={e => setStartYearDate(e.target.value)} placeholder='year' type="text" name="" id="" />
                                </div>
                                <div>
                                    <div>
                                        End Date
                                    </div>
                                    <input onChange={e => setDayDate(e.target.value)} placeholder='day' type="text" name="" id="" />
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
                                    <input onChange={e => setYearDate(e.target.value)} placeholder='year' type="text" name="" id="" />
                                </div>
                                <div>
                                    <input onChange={e => setcommentup(e.target.value)} placeholder='comment' type="text" name="" id="" />
                                </div>
                            </div>
                            <div>
                                <button onClick={updateItem}>UPDATE ITEM</button>
                            </div>




                        </div>
                        {/* <div>
                            <div>project    </div>
                            <div>so </div>
                            <div>equip  </div>
                        </div>
                        <div>
                            <div>codeA  </div>
                            <div>codeB  </div>
                            <div>codePR </div>
                            <div>codePS </div>
                            <div>codeDR </div>
                        </div>
                        <div>
                            <div>type0  </div>
                            <div>type1  </div>
                            <div>type2  </div>
                            <div>type3  </div>
                            <div>type4  </div>
                        </div>
                        <div>
                            <div>startDate  </div>
                            <div>endDate    </div>
                        </div> */}
                    </div>
                    <div className='itemInformation'>
                        <div>
                            <div>
                                {items[0]?.project}
                            </div>
                            <div>
                                {items[0]?.so}
                            </div>
                            <div>
                                {items[0]?.equip}
                            </div>
                        </div>
                        <div>
                            <div>
                                {items[0]?.codeA}
                            </div>
                            <div>
                                {items[0]?.codeB}
                            </div>
                        </div>
                        <div>
                            <div>
                                {items[0]?.codePR}
                            </div>
                            <div>
                                {items[0]?.codePS}
                            </div>
                            <div>
                                {items[0]?.codeDR}
                            </div>
                        </div>
                        <div>
                            <div>
                                {items[0]?.type0}
                            </div>
                            <div>
                                {items[0]?.type1}
                            </div>
                            <div>
                                {items[0]?.type2}
                            </div>
                            <div>
                                {items[0]?.type3}
                            </div>
                            <div>
                                {items[0]?.type4}
                            </div>
                        </div>
                        <div className='hipotInfoDiv'>
                            <div className='hipotHeader'>Hipot</div>
                            <div className='hipotGrid'>
                                <div>
                                    <div>Value</div>
                                    <p>{items[0]?.hipotValue}</p>
                                </div>
                                <div>
                                    <div>Model</div>
                                    <p>{items[0]?.hipotModel}</p>
                                </div>
                                <div>
                                    <div>Multimeter</div>
                                    <p>{items[0]?.hipotMultimeterModel}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='checkZoneDiv'>
                        <div >
                            {/* <NavLink to={"/Supervisor/Checklists/ChecklistsCreate?"
                                + "project=" + items[0]?.project
                                + "&equipment=" + items[0]?.equipment
                                + "&type0=" + items[0]?.type0
                                + "&type1=" + items[0]?.type1
                                + "&type2=" + items[0]?.type2
                                + "&type3=" + items[0]?.type3
                                + "&type4=" + items[0]?.type4
                            }>
                                Create Checklist
                            </NavLink> */}
                            <div>
                                <select onChange={e => updateChecklist(e.target.value)} name="" id="">
                                    <option value="">Checklist</option>
                                    <option value="true">Finished</option>
                                    <option value="false">Pending</option>
                                </select>
                            </div>
                            <div>
                                {checklist1 === 'true' ? <img src={truelogo} /> : <img src={falselogo} />}
                            </div>
                        </div>
                        <div>

                            <div>
                                <select name="" id="" onChange={e => updateDeployment(e.target.value)}>
                                    <option value="">Deployment</option>
                                    <option value="true">Finished</option>
                                    <option value="false">Pending</option>
                                </select>
                            </div>
                            <div>
                                {deployment1 === 'true' ? <img src={truelogo} /> : <img src={falselogo} />}
                            </div>
                        </div>
                        <div>

                            <div>
                                <select name="" id="" onChange={e => updateTraceability(e.target.value)}>
                                    <option value="">Traceability</option>
                                    <option value="true">Finished</option>
                                    <option value="false">Pending</option>
                                </select>
                            </div>
                            <div>
                                {traceability1 === 'true' ? <img src={truelogo} /> : <img src={falselogo} />}
                            </div>

                        </div>
                    </div>
                    <div className='itemIssuesDiv'>
                        <div className='itemIssuesContentDiv'>
                            <div className='itemIssuesSearch'>
                                <div>
                                    <input placeholder="Search by description" type="text" onChange={e => setIssueSearch(e.target.value)} />
                                    <select style={alert0 === 'missingRef' ? { backgroundColor: 'var(--red)' } : null} name="" id="" onChange={e => setRef_Issue(e.target.value)}>
                                        <option value=""></option>
                                        {issueArray.map((e, key) =>
                                            <option key={e.id_issues} value={e.id_issues}>
                                                {e.ref_issue}: {e.description_issue}
                                            </option>
                                        )
                                        }
                                    </select>
                                </div>
                                <div>
                                    <input placeholder='Comment' type="text" name="" id="" onChange={e => setComment(e.target.value)} />
                                </div>
                                <div>
                                    <button onClick={e => addItemIssue()}>Add Issue</button>
                                </div>
                            </div>
                        </div>
                        <div className='itemIssueList'>
                            <div className='itemIssuesHeaders'>
                                <div>Issue Code</div>
                                <div>Issue Description</div>
                                <div>Issue Level</div>
                                <div>Comment</div>
                                <div>Issue Status</div>
                                <div>Action</div>
                                <div></div>
                            </div>
                            {itemIssuesArray.map((e, key) => (
                                <div className='itemIssueContent' key={key}>
                                    <div>{e.ref_issue}</div>
                                    <div>{e.description_issue}</div>
                                    <div>{e.level_issue}</div>
                                    <div>{e.comment}</div>
                                    <div>
                                        <a style={e.issue_status === 'OPEN' ? { backgroundColor: 'yellow' } : { backgroundColor: 'var(--green)', color: 'white' }} onClick={a => updateItemIssueStatus({ iditem_issues: e.iditem_issues, key: key })}>
                                            {e.issue_status}
                                        </a>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <p>
                                            {e.action}
                                        </p>
                                        <input type="text" onChange={a => setAction(a.target.value)} />
                                    </div>
                                    <div>
                                        <a style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={a => deleteItemIssue(e.iditem_issues)}>
                                            Delete
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    < div style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px' }}>
                        <button className='finishProcBtn' onClick={e => updateStatus()}>
                            Finish process
                        </button>
                        {finishProcess === true
                            ?
                            <p style={{ color: 'var(--red)' }} >
                                This product has open issues!
                            </p>
                            :
                            null
                        }
                    </div>
                </div> :
                    <div className='itemNotExist'>
                        <div>
                            <button className='backBtn' onClick={e => handleRetro()}>BACK</button>
                        </div>
                        <div>
                            This item does not exist!
                        </div>
                    </div>
                }
            </div >
        </>
    )
}