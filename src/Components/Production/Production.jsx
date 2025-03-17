import React, { useEffect, useContext } from "react"
import { useState } from "react"
import { Outlet, NavLink, Route, Routes } from "react-router-dom"
import { fetchProjectsAXIOS, fetchProductionAXIOS, fetchSOAXIOS } from "../../API/Axios/axios"
import Projects from "../Projects/Projects"
import './Production.css'
import { useAuth } from "../../GLOBAL/Global"
import $ from 'jquery'

export default function Production() {

    const { project } = useAuth()

    const [projects, setProjects] = useState([])
    const [so, setSo] = useState([])
    const [equip, setEquip] = useState([])
    const [codeA, setCodeA] = useState([])
    const [codeB, setCodeB] = useState([])
    const [codePR, setCodePR] = useState([])
    const [codePS, setCodePS] = useState([])
    const [codeDR, setCodeDR] = useState([])
    const [type0, setType0] = useState([])
    const [type1, setType1] = useState([])
    const [type2, setType2] = useState([])
    const [type3, setType3] = useState([])
    const [type4, setType4] = useState([])
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
    const fetchSO = async () =>{
        const res = await fetchSOAXIOS({projectSearch, soSearch})
        setSo(res.data[0])
    }

    const [production, setProduction] = useState([])
    const fetchProduction = async () => {
        console.log('prod fetch asunc')
        const res = await fetchProductionAXIOS({
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
        })
        console.log(res)
        setProduction(res.data[0])

    }

    const [searchState, setSearchState] = useState(false)
    const searchController = () => {
        if (searchState === false) {
            $('.searchDiv').css('display', 'flex')
            setSearchState(!searchState)
        } else {
            $('.searchDiv').css('display', 'none')
            setSearchState(!searchState)
        }
    }



    useEffect(() => {
        fetchProjects()
        console.log(project)
    }, [projectSearch])

    useEffect(()=>{
        fetchSO()
    },[projectSearch,soSearch])

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

    return (
        <>
            <div className="prodMainDiv">
                <div>
                    <button onClick={searchController}>SHOW SEARCH</button>
                </div>
                <div className="searchDiv" style={{ display: 'flex' }}>
                    <div className="projectSearchDiv">
                        <input type="text" onChange={e => setProjectSearch(e.target.value)} placeholder="Project" />
                        {projectSearch == '' ? null
                            : projects.map((e, key) => {
                                return (
                                    <li>
                                        {e.project}
                                    </li>
                                )
                            })
                        }
                    </div>

                    <div className="soSearchDiv">
                        <input type="text" onChange={e => setSoSearch(e.target.value)} placeholder="SO" />
                        {(projectSearch == '' && soSearch == '') ? null :
                         so.map((e, key) => {
                            return (
                                <li>
                                    {e.SOref}
                                </li>
                            )
                        })}
                    </div>

                    <div className="equipmentSearchDiv">
                        <input type="text" onChange={e => setEquipSearch(e.target.value)} placeholder="Equipment" />
                        <li>
                            Equipment
                        </li>
                    </div>

                    <div className="codeSearchDiv">
                        <div className="codeASearchDiv">
                            <input type="text" onChange={e => setCodeaSearch(e.target.value)} placeholder="CodeA" />
                            <li>
                                CodeA
                            </li>
                        </div>
                        <div className="CodeBSearchDiv">
                            <input type="text" onChange={e => setCodebSearch(e.target.value)} placeholder="CodeB" />
                            <li>
                                CodeB
                            </li>
                        </div>
                        <div className="CodePRSearchDiv">
                            <input type="text" onChange={e => setCodeprSearch(e.target.value)} placeholder="CodePR" />
                            <li>
                                CodePR
                            </li>
                        </div>

                        <div className="CodePSSearchDiv">
                            <input type="text" onChange={e => setCodepsSearch(e.target.value)} placeholder="CodePS" />
                            <li>
                                CodePS
                            </li>
                        </div>
                        <div className="CodeDRSearchDiv">
                            <input type="text" onChange={e => setCodedrSearch(e.target.value)} placeholder="CodeDR" />
                            <li>
                                CodeDR
                            </li>
                        </div>
                    </div>
                    <div className="typeSearchDiv">
                        <div className="type0Div">
                            <input type="text" onChange={e => setType0Search(e.target.value)} placeholder="Type0" />
                            <li>
                                CodeDR
                            </li>
                        </div>
                        <div className="type1Div">
                            <input type="text" onChange={e => setType1Search(e.target.value)} placeholder="Type1" />
                            <li>
                                CodeDR
                            </li>
                        </div>
                        <div className="type2Div">
                            <input type="text" onChange={e => setType2Search(e.target.value)} placeholder="Type2" />
                            <li>
                                CodeDR
                            </li>
                        </div>
                        <div className="type3Div">
                            <input type="text" onChange={e => setType3Search(e.target.value)} placeholder="Type3" />
                            <li>
                                CodeDR
                            </li>
                        </div>
                        <div className="type4Div">
                            <input type="text" onChange={e => setType4Search(e.target.value)} placeholder="Type4" />
                            <li>
                                CodeDR
                            </li>
                        </div>
                    </div>

                </div>
                {/* <nav class="prodNav">
                    {projects.map((e) =>
                        <>
                            <NavLink to={'/Production/' + e.project}> {e.project} </NavLink>
                        </>
                    )
                    }
                </nav>
                <div className="prodContentDiv">
                    {projects.map((e) =>
                        <>
                            <Routes>
                                <Route path={e.project + '/*'} element={<Projects project={e.project} />}></Route>
                            </Routes>
                        </>
                    )
                    }
                </div> */}
                <div>
                    PRODUCTION;
                    {production.map((e, key) =>
                    (
                        <>
                            <div>
                                {e.project}
                                {e.codeA}
                            </div>
                        </>
                    )
                    )}
                </div>
                <Outlet />
            </div>
        </>
    )
}