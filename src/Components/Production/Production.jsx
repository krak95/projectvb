import React, { useEffect } from "react"
import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { fetchProjectsAXIOS, fetchSOAXIOS, fetchProductionAXIOS, fetchEquipmentsAXIOS } from "../../API/Axios/axiosCS"
import { NavLink } from 'react-router-dom';
import './Production.css'
import { useAuth } from "../../GLOBAL/Global"
import $ from 'jquery'
import socket from "../../API/Socket/socket";

export default function Production() {

    const { project } = useAuth()

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

    }

    const [searchState, setSearchState] = useState(false)
    const searchController = () => {
        if (searchState === false) {
            // $('.searchDiv').css('display', 'flex')
            $('.searchDiv').animate({
                height: "0px"
            }, 50, function () {
                // closedetheka
                $('.searchController').text('OPEN')
            });
            setSearchState(!searchState)
        } else {
            // $('.searchDiv').css('display', 'none')
            $('.searchDiv').animate({
                height: "200px"
            }, 50, function () {
                // opendetcheka
                $('.searchController').text('CLOSE')

            });
            setSearchState(!searchState)
        }
    }

    const location = useLocation();

    useEffect(() => {
        console.log('Fetching productions...');
        fetchProduction();
    }, [location.key]);

    useEffect(() => {
        fetchProjects()
        console.log(project)
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
        socket.on('fetchProduction', (data) => {
            console.log('fetchProdcution on socket', data)
            fetchProduction()
        })
    }, [])

    return (
        <>
            <div className="prodMainDiv">
                <div>
                    <button className="searchController" onClick={searchController}>CLOSE</button>
                </div>
                <div className="searchDiv" style={{ display: 'flex' }}>
                    <div className="projectSearchDiv">
                        <input type="text" onChange={e => setProjectSearch(e.target.value)} placeholder="Project" />
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

                    <div className="soSearchDiv">
                        <input type="text" onChange={e => setSoSearch(e.target.value)} placeholder="SO" />
                        {(projects === undefined || so === undefined) ? null :
                            so.map((e, key) => {
                                return (
                                    <li key={key}>
                                        {e.SOref}
                                    </li>
                                )
                            })}
                    </div>

                    <div className="equipmentSearchDiv">
                        <input type="text" onChange={e => setEquipSearch(e.target.value)} placeholder="Equipment" />
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

                    <div className="codeSearchDiv">
                        <div className="codeASearchDiv">
                            <input type="text" onChange={e => setCodeaSearch(e.target.value)} placeholder="CodeA" />
                            {/* <li>
                                CodeA
                            </li> */}
                        </div>
                        <div className="CodeBSearchDiv">
                            <input type="text" onChange={e => setCodebSearch(e.target.value)} placeholder="CodeB" />
                            {/* <li>
                                CodeB
                            </li> */}
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
                            <input type="text" onChange={e => setType0Search(e.target.value)} placeholder="Type0" />
                            {/* <select name="" id="">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select> */}
                        </div>
                        <div className="type1Div">
                            <input type="text" onChange={e => setType1Search(e.target.value)} placeholder="Type1" />
                            {/* <select name="" id="">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select> */}
                        </div>
                        <div className="type2Div">
                            <input type="text" onChange={e => setType2Search(e.target.value)} placeholder="Type2" />
                            {/* <select name="" id="">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select> */}
                        </div>
                        <div className="type3Div">
                            <input type="text" onChange={e => setType3Search(e.target.value)} placeholder="Type3" />
                            {/* <select name="" id="">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select> */}
                        </div>
                        <div className="type4Div">
                            <input type="text" onChange={e => setType4Search(e.target.value)} placeholder="Type4" />
                            {/* <select name="" id="">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select> */}
                        </div>
                    </div>

                </div>

                <div className="itemListMainDiv">
                    <div className="itemListHeaders">
                        <div>
                            <div>
                                Project
                            </div>
                        </div>
                        <div>
                            <div>
                                SO
                            </div>
                        </div>
                        <div>
                            <div>
                                Equipment
                            </div>
                        </div>
                        <div>
                            <div>
                                Code A
                            </div>
                        </div>
                        <div>
                            <div>
                                Code B
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
                            }>
                                <div className="itemListDiv" key={key}>
                                    <div className="itemList">
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
                </div>
            </div>
            <Outlet />
        </>
    )
}