import './Item.css'
import axios from 'axios'
import { delProdAXIOS, fetchIssuesAXIOS, addItemIssueAXIOS, updateStatusAXIOS, fetchItemIssuesAXIOS, checkProductionAXIOS, fetchSOAXIOS, fetchEquipmentsAXIOS, fetchProductionAXIOS } from "../../API/Axios/axiosCS"
// import { fetchItemsAXIOS } from '../../API/Axios/axios'
import { Outlet, NavLink, Route, Routes } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import socket from '../../API/Socket/socket'

export default function Item() {

    const [items, setItems] = useState([])

    const [alert, setAlert] = useState('')

    const navigate = useNavigate();

    const handleRetro = () => {
        navigate('../../Production');
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

    const checkProduction = async () => {
        console.log('prod fetch asunc', project, codeA)
        try {
            const res = await checkProductionAXIOS({
                'Project': project,
                'So': so,
                'Equipment': equip,
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
            })
            if (res.data.length === 0) {
                setAlert('NotExist')
                return
            } else {
                console.log('setItemsCheck')
                setItems(res.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const updateStatus = async () => {
        var status = items[0].status
        if (status === 'nok') {
            status = 'ok'
        } else {
            status = 'nok'
        }
        var id_prod = items[0].id_prod
        console.log({ id_prod, status })
        try {
            const res = await updateStatusAXIOS({ id_prod, status })
            socket.emit('socketNewItem')
            checkProduction()
            handleRetro()
            console.log(res)
        } catch (e) {
            console.log(e)
        }
        console.log(items[0].status)
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
        checkProduction()
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
                {alert !== 'NotExist' ? <div className='itemInfo'>
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
                                <div className='itemIssueContent' key={key}>
                                    <div>{e.ref_issue}</div>
                                    <div>{e.description_issue}</div>
                                    <div>{e.level_issue}</div>
                                    <div>{e.comment}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={e => updateStatus()}>
                        Finish process
                    </button>
                </div> :
                    <div className='itemNotExist'>
                        <div>
                            <button className='backBtn' onClick={handleRetro}>BACK</button>
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