import './Item.css'
import axios from 'axios'
import { delProdAXIOS, fetchIssuesAXIOS, addItemIssueAXIOS, fetchItemIssuesAXIOS, fetchProjectsAXIOS, fetchSOAXIOS, fetchEquipmentsAXIOS, fetchProductionAXIOS } from "../../API/Axios/axiosCS"
// import { fetchItemsAXIOS } from '../../API/Axios/axios'
import { Outlet, NavLink, Route, Routes } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import socket from '../../API/Socket/socket'

export default function Item() {

    const [items, setItems] = useState([])

    const navigate = useNavigate();

    const handleRetro = () => {
        navigate(-1);
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

    const [comment, setComment] = useState('')
    const addItemIssue = async () => {
        const res = await addItemIssueAXIOS({ id_issue: ref_issue, id_item: id_prod, comment: comment })
        console.log(res.data)
        socketAddItemIssue()
    }

    const [ref_issue, setRef_Issue] = useState('')
    const [issueArray, setIssueArray] = useState([])
    const [itemIssuesArray, setItemIssuesArray] = useState([])
    const [issueSearch, setIssueSearch] = useState('')

    const fetchItemIssues = async () => {
        const res = await fetchItemIssuesAXIOS({ id_item: id_prod })
        console.log(res)
        setItemIssuesArray(res.data)
    }


    const fetchIssues = async () => {
        const res = await fetchIssuesAXIOS({ ref_issue: issueSearch, description_issue: issueSearch })
        console.log(res.data)
        setIssueArray(res.data)
    }

    const fetchProduction = async () => {
        console.log('prod fetch asunc', project, codeA)
        const res = await fetchProductionAXIOS({
            'Project': project,
            'So': so,
            'Equipment': equip,
            'CodeA': codeA,
            'CodeB': codeB,
            'CodePR': null,
            'CodePS': null,
            'CodeDR': null,
            'Type0': null,
            'Type1': null,
            'Type2': null,
            'Type3': null,
            'Type4': null,
            'ReadyPQA': null,
            'Tester': null,
        })
        console.log(res)
        setItems(res.data)
    }

    const delProd = async () => {

        if (window.confirm("Delete item?") === true) {
            console.log(id_prod)
            const res = await delProdAXIOS(id_prod)
            console.log(res)
            navigate(-1);
            socketNewItem()
        }
    }

    function socketNewItem() {
        socket.emit('socketNewItem', 'data')
        console.log('emit fetchprod')
    }

    function socketAddItemIssue() {
        socket.emit('socketAddItemIssue')
    }

    useEffect(() => {
        console.log('useeffect itemjsx', codeA)
        fetchProduction()
        fetchItemIssues()
        socket.on('socketFetchItemIssue', () => {
            fetchItemIssues()
        })
        // alert('item', project, so, codeA, codeB)
    }, [])
    useEffect(() => {
        fetchIssues()
    }, [issueSearch])
    return (
        <>
            <div className="itemContentDiv">
                <div className='itemInfo'>
                    <div className='itemPageHeader'>
                        <button className='backBtn' onClick={handleRetro}>BACK</button>
                        <div>Tested by: <p>{tester}</p></div>
                        <button className='backBtn' onClick={delProd}>DELETE ITEM</button>
                    </div>
                    <div className='itemHeaders'>
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
                    <div>
                        <div>
                            <div>
                                {project}
                            </div>
                            <div>
                                {so}
                            </div>
                        </div>
                        <div>
                            <div>
                                {equip}
                            </div>
                            <div>
                                {codeA}
                            </div>
                            <div>
                                {codeB}
                            </div>
                            <div>
                                {codePR}
                            </div>
                            <div>
                                {codePS}
                            </div>
                            <div>
                                {codeDR}
                            </div>
                        </div>
                        <div>

                            <div>
                                {type0}
                            </div>
                            <div>
                                {type1}
                            </div>
                            <div>
                                {type2}
                            </div>
                            <div>
                                {type3}
                            </div>
                            <div>
                                {type4}
                            </div>
                        </div>
                        <div>
                            <div>
                                {startDate}
                            </div>
                            <div>
                                {endDate}
                            </div>
                        </div>
                    </div>
                    <div className='itemIssuesDiv'>
                        <div className='itemIssuesContentDiv'>
                            <div className='itemIssuesSearch'>
                                <div>
                                    <input type="text" onChange={e => setIssueSearch(e.target.value)} />
                                    <select name="" id="" onChange={e => setRef_Issue(e.target.value)}>
                                        <option value=""></option>
                                        {issueArray.map((e, key) =>
                                            <option value={e.id_issues}>
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
                                    <button onClick={addItemIssue}>Add Issue</button>
                                </div>
                            </div>
                        </div>
                        <div className='itemIssueList'>
                            <div className='itemIssuesHeaders'>
                                <div>Issue Code</div>
                                <div>Issue Description</div>
                                <div>Issue Level</div>
                                <div>Comment</div>
                            </div>
                            {itemIssuesArray.map((e, key) => (
                                <div className='itemIssuesList' key={key}>
                                    <div>{e.ref_issue}</div>
                                    <div>{e.description_issue}</div>
                                    <div>{e.level_issue}</div>
                                    <div>{e.comment}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}