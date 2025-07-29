import { useEffect, useMemo } from "react"
import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { fetchProjectsAXIOS, fetchSOAXIOS, fetchProductionAXIOS, fetchEquipmentsAXIOS } from "../../../API/Axios/axiosCS"
import { NavLink } from 'react-router-dom';
import './Products.css'
import $ from 'jquery'
import socket from "../../../API/Socket/socket";
import * as XLSX from 'xlsx'


export default function Products() {


    const [projects, setProjects] = useState([])
    const [so, setSo] = useState([])
    const [equips, setEquips] = useState([])
    // const [codeA, setCodeA] = useState([])
    // const [codeB, setCodeB] = useState([])
    // const [codePR, setCodePR] = useState([])
    // const [codePS, setCodePS] = useState([])
    // const [codeDR, setCodeDR] = useState([])
    // const [type0, setType0] = useState([])
    // const [type1, setType1] = useState([])
    // const [type2, setType2] = useState([])
    // const [type3, setType3] = useState([])
    // const [type4, setType4] = useState([])
    const [projectSearch, setProjectSearch] = useState('')
    const [soSearch, setSoSearch] = useState('')
    const [equipSearch, setEquipSearch] = useState('')
    const [codeaSearcg, setCodeaSearch] = useState('')
    const [codebSearch, setCodebSearch] = useState('')
    const [codeprSearch, setCodeprSearch] = useState('')
    const [codepsSearch, setCodepsSearch] = useState('')
    const [codedrSearch, setCodedrSearch] = useState('')
    const [type0Search, setType0Search] = useState('')
    const [type1Search, setType1Search] = useState('')
    const [type2Search, setType2Search] = useState('')
    const [type3Search, setType3Search] = useState('')
    const [type4Search, setType4Search] = useState('')
    const [ww_number, setww_number] = useState('')
    const [tester, setTester] = useState('')
    const [comment, setComment] = useState('')
    const [orderVar, setOrdervar] = useState('ww_number')
    const [ascordesc, setAscorDesc] = useState('ASC')

    const fetchProjects = async () => {
        const res = await fetchProjectsAXIOS({ projectSearch })
        console.log(res)
        setProjects(res.data[0])
    }
    const fetchSO = async () => {
        const res = await fetchSOAXIOS({ 'Project': projectSearch, 'So': soSearch })
        setSo(res.data[0])
    }

    const fetchEquips = async () => {
        const res = await fetchEquipmentsAXIOS({ 'Equipment': equipSearch })
        setEquips(res.data[0])
    }

    const [production, setProduction] = useState([])
    const [countProd, setCountProd] = useState(0)


    const exportToExcel = () => {
        console.log(XLSX)
        const worksheet = XLSX.utils.json_to_sheet(production)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "exportToExcel.xlsx")
    }

    const fetchProduction = async () => {
        console.log('prod fetch asunc')
        const res = await fetchProductionAXIOS({
            'Project': projectSearch,
            'So': soSearch,
            'Equipment': equipSearch,
            'CodeA': codeaSearcg,
            'CodeB': codebSearch,
            'CodePR': codeprSearch,
            'CodePS': codepsSearch,
            'CodeDR': codedrSearch,
            'Type0': type0Search,
            'Type1': type1Search,
            'Type2': type2Search,
            'Type3': type3Search,
            'Type4': type4Search,
            'ReadyPQA': null,
            'Tester': tester,
            'ww_number': ww_number,
            'Status': '',
            'Comment': '',
            'ChecklistStatus': '',
            'DeploymentStatus': '',
            'TraceabilityStatus': '',
        })
        console.log(res.data)
        setProduction(res.data)
        setCountProd((res.data).length)
    }

    const [searchState, setSearchState] = useState(false)
    const searchController = () => {
        if (searchState === false) {
            // $('.searchDiv').css('display', 'flex')
            $('.searchDiv').animate({
                height: "76px"
            }, 50, function () {
            });
            setSearchState(!searchState)
        } else {
            // $('.searchDiv').css('display', 'none')
            $('.searchDiv').animate({
                height: "0"
            }, 50, function () {

            });
            setSearchState(!searchState)
        }
    }

    const location = useLocation();

    const fetchProdByCard = async () => {
        if (location.state === null) {
            return
        } else {

            setProjectSearch(location.state.project)
            setEquipSearch(location.state.equipment)
            setww_number(location.state.workweek)
        }
        // setTimeout(() => {

        //     fetchProduction()
        // }, 300);

    }

    useEffect(() => {
        window.history.replaceState({}, '')
        setTimeout(() => {
            fetchProdByCard()
        }, 100);
    }, [])
    // useEffect(() => {
    //     console.log('Fetching productions...');
    //     fetchProduction();
    // }, [location.key]);

    useEffect(() => {
        fetchProjects()
    }, [projectSearch])

    useEffect(() => {
        fetchSO()
    }, [projectSearch, soSearch])

    useEffect(() => {
        fetchEquips()
    }, [equipSearch])

    useMemo(() => {
        fetchProduction()
    }, [
        projectSearch,
        soSearch,
        equipSearch,
        codeaSearcg,
        codebSearch,
        codeprSearch,
        codepsSearch,
        codedrSearch,
        type0Search,
        type1Search,
        type2Search,
        type3Search,
        type4Search,
        ww_number,
        tester
    ])

    useEffect(() => {
        console.log('products')
        fetchProduction()
        socket.on('fetchProduction', (data) => {
            console.log('fetchProdcution on socket', data)
            fetchProduction()
        })
    }, [])



    const [orderWWnumber, setOrderWWnumber] = useState(null)
    const orderByWWnumber = () => {
        if (orderWWnumber === (null || true)) {
            //Ascending
            setOrderWWnumber(false)
            setOrderProject(null)
            setorderByEquip(null)
            setOrderByCodeA(null)
            setOrderByCodeB(null)
            setOrderByStatus(null)
            production.sort((b, a) => {
                return a.ww_number.localeCompare(b.ww_number);
            });
        } else {
            //Descending
            setOrderWWnumber(true)
            setOrderProject(null)
            setorderByEquip(null)
            setOrderByCodeA(null)
            setOrderByCodeB(null)
            setOrderByStatus(null)
            production.sort((a, b) => {
                return a.ww_number.localeCompare(b.ww_number);
            });
        }
    }

    const [orderProject, setOrderProject] = useState(null)
    const orderByProject = () => {
        if (orderProject === true) {
            //Ascending
            setOrderProject(false)
            setOrderWWnumber(null)
            setorderByEquip(null)
            setOrderByCodeA(null)
            setOrderByCodeB(null)
            setOrderByStatus(null)
            production.sort((b, a) => {
                return a.project.localeCompare(b.project);
            });
        } else {
            //Descending
            setOrderProject(true)
            setOrderWWnumber(null)
            setorderByEquip(null)
            setOrderByCodeA(null)
            setOrderByCodeB(null)
            setOrderByStatus(null)
            production.sort((a, b) => {
                return a.project.localeCompare(b.project);
            });
        }
    }

    const [orderEquip, setorderByEquip] = useState(null)
    const orderByEquip = () => {
        if (orderEquip === true) {
            //Ascending
            setorderByEquip(false)
            setOrderProject(null)
            setOrderWWnumber(null)
            setOrderByCodeA(null)
            setOrderByCodeB(null)
            setOrderByStatus(null)
            production.sort((b, a) => {
                return a.equipment.localeCompare(b.equipment);
            });
        } else {
            //Descending
            setorderByEquip(true)
            setOrderProject(null)
            setOrderWWnumber(null)
            setOrderByCodeA(null)
            setOrderByCodeB(null)
            setOrderByStatus(null)
            production.sort((a, b) => {
                return a.equipment.localeCompare(b.equipment);
            });
        }
    }
    const [orderCodeA, setOrderByCodeA] = useState(false)
    const orderByCodeA = () => {
        if (orderCodeA === true) {
            //Ascending
            setOrderByCodeA(false)
            setorderByEquip(null)
            setOrderProject(null)
            setOrderWWnumber(null)
            setOrderByCodeB(null)
            setOrderByStatus(null)
            production.sort((b, a) => {
                return a.codeA.localeCompare(b.codeA);
            });
        } else {
            //Descending
            setOrderByCodeA(true)
            setorderByEquip(null)
            setOrderProject(null)
            setOrderWWnumber(null)
            setOrderByCodeB(null)
            setOrderByStatus(null)
            production.sort((a, b) => {
                return a.codeA.localeCompare(b.codeA);
            });
        }
    }
    const [orderCodeB, setOrderByCodeB] = useState(null)
    const orderByCodeB = () => {
        if (orderCodeB === true) {
            //Ascending
            setOrderByCodeB(false)
            setOrderByCodeA(null)
            setorderByEquip(null)
            setOrderProject(null)
            setOrderWWnumber(null)
            setOrderByStatus(null)
            production.sort((b, a) => {
                return a.codeB.localeCompare(b.codeB);
            });
        } else {
            //Descending
            setOrderByCodeB(true)
            setOrderByCodeA(null)
            setorderByEquip(null)
            setOrderProject(null)
            setOrderWWnumber(null)
            setOrderByStatus(null)
            production.sort((a, b) => {
                return a.codeB.localeCompare(b.codeB);
            });
        }
    }

    const [orderStatus, setOrderByStatus] = useState(null)
    const setOrderStatus = () => {
        if (orderStatus === true) {
            //Ascending
            setOrderByStatus(false)
            setOrderByCodeA(null)
            setorderByEquip(null)
            setOrderProject(null)
            setOrderWWnumber(null)
            setOrderByCodeB(null)
            production.sort((b, a) => {
                return a.status.localeCompare(b.status);
            });
        } else {
            //Descending
            setOrderByStatus(true)
            setOrderByCodeA(null)
            setorderByEquip(null)
            setOrderProject(null)
            setOrderWWnumber(null)
            setOrderByCodeB(null)
            production.sort((a, b) => {
                return a.status.localeCompare(b.status);
            });
        }
    }

    return (
        <>
            <div className="mainNav">
                <Outlet />
            </div>
            <div className="prodMainDiv">
                <div className="searchDiv" style={{ display: 'flex' }}>
                    <div className="codeSearchDiv">
                        <div>
                            <input type="text" placeholder="Search by tester" onChange={e => setTester(e.target.value)} name="" id="" />
                        </div>
                        <div className="CodePRSearchDiv">
                            <input type="text" onChange={e => setCodeprSearch(e.target.value)} placeholder="CodePR" />
                            {/* <li>
                                CodePR
                            </li> */}
                        </div>
                        <div className="CodePSSearchDiv">
                            <input type="text" onChange={e => setCodepsSearch(e.target.value)} placeholder="CodePS" />
                            {/* <li>
                                CodePS
                            </li> */}
                        </div>
                        <div className="CodeDRSearchDiv">
                            <input type="text" onChange={e => setCodedrSearch(e.target.value)} placeholder="CodeDR" />
                            {/* <li>
                                CodeDR
                            </li> */}
                        </div>
                    </div>
                    <div className="typeSearchDiv">
                        <div className="type0Div">
                            <select name="" id="" onChange={e => setType0Search(e.target.value)} >
                                <option value="">Start/Middle/End</option>
                                <option value="Start">Start</option>
                                <option value="Middle">Middle</option>
                                <option value="End">End</option>
                            </select>
                        </div>
                        <div className="type1Div">
                            <select name="" id="" onChange={e => setType1Search(e.target.value)}>
                                <option value="">A/B</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                            </select>
                        </div>
                        <div className="type2Div">
                            <select name="" id="" onChange={e => setType2Search(e.target.value)}>
                                <option value="">Standard/Hybrid/PRM</option>
                                <option value="Standard">Standard</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="PRM">PRM</option>
                            </select>
                        </div>
                        <div className="type3Div">
                            <select name="" id="" onChange={e => setType3Search(e.target.value)}>
                                <option value="">In/Out</option>
                                <option value="In">In</option>
                                <option value="Out">Out</option>
                            </select>
                        </div>
                        <div className="type4Div">
                            <select name="" id="" onChange={e => setType4Search(e.target.value)}>
                                <option value="">ABC/SBG/SCP</option>
                                <option value="ABC">ABC</option>
                                <option value="SBG">SBG</option>
                                <option value="SCP">SCP</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="productionCountDiv">
                    <div>
                        <NavLink className='newItemBtn' to="/Production/Products/MySQLController">New Item</NavLink>
                    </div>
                    <div>
                        <span className="searchController" onClick={searchController}>Search</span>

                    </div>
                    {/* <div >
                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--light)', color: 'var(--primary)', padding: "10px", borderRadius: "6px" }}>
                            Quantity: {countProd}
                        </span>
                    </div> */}
                    <div>
                        <button onClick={e => exportToExcel()}>Export to Excel</button>
                    </div>
                </div>
                <div className="itemListMainDiv">
                    <div className="itemListHeaders">
                        <div className="">
                            <div onClick={orderByWWnumber}>WorkWeek {orderWWnumber === true ? 'ASC' : (orderWWnumber === false ? 'DESC' : '')}</div>
                            <div>
                                <input placeholder="Search by workweek" type="text" onChange={e => setww_number(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <div onClick={orderByProject}>
                                Project {orderProject === true ? 'ASC' : (orderProject === false ? 'DESC' : '')}
                            </div>
                            <div className="projectSearchDiv">
                                <input placeholder="Search by project" type="text" onChange={e => setProjectSearch(e.target.value)} />
                                {projects === undefined ? null
                                    : projects.map((e, key) => {
                                        return (
                                            <li key={key}>
                                                {e.project}
                                            </li>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div>
                            <div onClick={orderByEquip}>
                                Equipment {orderEquip === true ? 'ASC' : (orderEquip === false ? 'DESC' : '')}
                            </div>
                            <div className="equipmentSearchDiv">
                                <input placeholder="Search by equipment" type="text" onChange={e => setEquipSearch(e.target.value)} />
                                {/* <select name="" id="">
                            <option value=""></option>
                            {equips === undefined ? null : equips.map((e, key) => {
                                return (
                                    <option value={e.equipName} key={key}>
                                        {e.equipName}
                                    </option>
                                )
                            })}
                        </select> */}
                            </div>
                        </div>
                        <div>
                            <div onClick={orderByCodeA}>
                                Code A {orderCodeA === true ? 'ASC' : (orderCodeA === false ? 'DESC' : '')}
                            </div>
                            <div className="codeASearchDiv">
                                <input placeholder="Search by A code" type="text" onChange={e => setCodeaSearch(e.target.value)} />
                                {/* <li>
                                CodeA
                            </li> */}
                            </div>
                        </div>
                        <div>
                            <div onClick={orderByCodeB}>
                                Code B {orderCodeB === true ? 'ASC' : (orderCodeB === false ? 'DESC' : '')}
                            </div>
                            <div className="CodeBSearchDiv">
                                <input placeholder="Search by B code" type="text" onChange={e => setCodebSearch(e.target.value)} />
                                {/* <li>
                                CodeB
                            </li> */}
                            </div>
                        </div>
                        {/* <div>
                            <div>
                                CodePR
                            </div>
                            <div className="soSearchDiv">
                                <input placeholder="Search by CodePR" type="text" onChange={e => setCodeprSearch(e.target.value)} />
                                {(projects === undefined || so === undefined) ? null :
                                    so.map((e, key) => {
                                        return (
                                            <li key={key}>
                                                {e.codePR}
                                            </li>
                                        )
                                    })}
                            </div>
                        </div> */}

                        <div className="">
                            <div>Comment</div>
                            <div>
                                {/* <input type="text" onChange={e => setww_number(e.target.value)} /> */}
                            </div>
                        </div>
                        <div className="itemStatusHeaderDiv">
                            <div onClick={setOrderStatus}>
                                Status {orderStatus === true ? 'ASC' : (orderStatus === false ? 'DESC' : '')}
                            </div>
                        </div>
                    </div>
                    {production === undefined ? null : production.map((e, key) =>
                    (
                        <div key={key} className="itemListLink">
                            <NavLink to={
                                "/Production/Products/item?"
                                + "id_prod=" + e.id_prod
                                + "&project=" + e.project
                                + "&so=" + e.so
                                + "&equip=" + e.equipment
                                + "&codeA=" + e.codeA
                                + "&codeB=" + e.codeB
                                + "&codePR=" + e.codePR
                                + "&codePS=" + e.codePS
                                + "&codeDR=" + e.codeDR
                                + "&type0=" + e.type0
                                + "&type1=" + e.type1
                                + "&type2=" + e.type2
                                + "&type3=" + e.type3
                                + "&type4=" + e.type4
                                + "&tester=" + e.tester
                                + "&startDate=" + e.startDate
                                + "&endDate=" + e.endDate
                                + "&status=" + e.status
                                + "&hipotValue=" + e.hipotValue
                                + "&hipotModel=" + e.hipotModel
                                + "&hipotMultimeterModel=" + e.hipotMultimeterModel
                                + "&workweek=" + e.workweek
                                + "&comment=" + e.comment
                            }>
                                <div className="itemListDiv" key={key}>
                                    <div className="itemList">
                                        <div>
                                            <div>{e.ww_number}</div>
                                        </div>
                                        <div>
                                            <div>
                                                {e.project}
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                {e.equipment}
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                {e.codeA}
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                {e.codeB}
                                            </div>
                                        </div>

                                        <div>
                                            <div>{e.comment}</div>
                                        </div>
                                        <div className="itemStatusDiv">
                                            <span className="itemStatusSpan"
                                                style={
                                                    (e.status === 'ok' || e.status === 'fixed') ? { color: 'var(--green)' } : (e.status === 'nok' ? { color: 'var(--red)' } : { color: 'black' })
                                                }
                                            >
                                                {e.status}
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    )
                    )}
                </div >
            </div >
        </>
    )
}