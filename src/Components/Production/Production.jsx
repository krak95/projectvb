import React, { useEffect } from "react"
import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { fetchProjectsAXIOS, fetchSOAXIOS, fetchProductionAXIOS, fetchEquipmentsAXIOS, fetchCountProductionAXIOS } from "../../API/Axios/axiosCS"
import { NavLink } from 'react-router-dom';
import './Production.css'
import $ from 'jquery'
import socket from "../../API/Socket/socket";

export default function Production() {


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
            'Tester': '',
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

    useEffect(() => {
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
        type4Search
    ])

    useEffect(() => {
        fetchProduction()
        socket.on('fetchProduction', (data) => {
            console.log('fetchProdcution on socket', data)
            fetchProduction()
        })
    }, [])

    return (
        <>

            <div className="mainNav">
                <NavLink className='newItemBtn' to="/Production/MySQLController">New Item</NavLink>
            </div>
            <Outlet />
            <div className="prodMainDiv">
                <div className="controllerDiv">
                    <div>
                        <a className="searchController" onClick={searchController}>Search</a>
                    </div>
                </div>
                <div className="searchDiv" style={{ display: 'flex' }}>
                    <div className="codeSearchDiv">
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
                        Product quantity: {countProd}
                    </div>
                </div>
                <div className="itemListMainDiv">
                    <div className="itemListHeaders">
                        <div className="itemStatusHeaderDiv">
                            <div>
                            </div>
                        </div>
                        <div>
                            <div>
                                Project
                            </div>
                            <div className="projectSearchDiv">
                                <input type="text" onChange={e => setProjectSearch(e.target.value)} />
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
                            <div>
                                SO
                            </div>
                            <div className="soSearchDiv">
                                <input type="text" onChange={e => setSoSearch(e.target.value)} />
                                {(projects === undefined || so === undefined) ? null :
                                    so.map((e, key) => {
                                        return (
                                            <li key={key}>
                                                {e.SOref}
                                            </li>
                                        )
                                    })}
                            </div>
                        </div>
                        <div>
                            <div>
                                Equipment
                            </div>
                            <div className="equipmentSearchDiv">
                                <input type="text" onChange={e => setEquipSearch(e.target.value)} />
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
                            <div>
                                Code A
                            </div>
                            <div className="codeASearchDiv">
                                <input type="text" onChange={e => setCodeaSearch(e.target.value)} />
                                {/* <li>
                                CodeA
                            </li> */}
                            </div>
                        </div>
                        <div>
                            <div>
                                Code B
                            </div>
                            <div className="CodeBSearchDiv">
                                <input type="text" onChange={e => setCodebSearch(e.target.value)} />
                                {/* <li>
                                CodeB
                            </li> */}
                            </div>
                        </div>
                    </div>
                    {production === undefined ? null : production.map((e, key) =>
                    (
                        <div key={key} className="itemListLink">
                            <NavLink to={
                                "/Production/item?"
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
                            }>
                                <div className="itemListDiv" key={key}>
                                    <div className="itemList">
                                        <div className="itemStatusDiv">
                                            <span className="itemStatusSpan"
                                                style={
                                                    e.status === 'ok' ? { color: 'var(--green)' } : { color: 'var(--red)' }
                                                }
                                            >
                                                {e.status}
                                            </span>
                                        </div>
                                        <div>
                                            <div>
                                                {e.project}
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                {e.so}
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