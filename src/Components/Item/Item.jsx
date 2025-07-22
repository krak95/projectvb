import './Item.css'
import { deleteItemIssueAXIOS, delProdAXIOS, fetchIssuesAXIOS, addItemIssueAXIOS, updateStatusAXIOS, fetchItemIssuesAXIOS, checkProductionAXIOS, updateItemIssueStatusAXIOS, fetchSOAXIOS, fetchEquipmentsAXIOS, fetchProductionAXIOS } from "../../API/Axios/axiosCS"
// import { fetchItemsAXIOS } from '../../API/Axios/axios'
import { useState, useEffect, use } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import socket from '../../API/Socket/socket'
import { datefunction } from '../../CustomHooks/Date/Date'
import { checkLogin } from '../../CustomHooks/Login/LoginHook'
import GlobalContent from '../../GLOBAL/Global'
import { setData } from '../../CustomHooks/LocalStorage/StoreData'
import { useContext } from 'react'

export default function Item({ path }) {
    const { authorizing } = useContext(GlobalContent);
    const [items, setItems] = useState([])

    const [alert0, setAlert0] = useState('')

    const navigate = useNavigate();

    const handleRetro = () => {
        window.location.href = 'http://localhost:3000/' + path + ''
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
            console.log(res.data.length)
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
        if (finishProcess === false) {
            status = 'fixed'
        } else if (finishProcess === true) {
            status = 'nok'
        } else {
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
        console.log('useeffect itemjsx', codeA)
        checkProduction()
        fetchItemIssues()
        socket.on('socketFetchItemIssue', () => {
            fetchItemIssues()
        })
        // alert0('item', project, so, codeA, codeB)
    }, [])
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
                                <p>{startDate}</p> until <p>{endDate === '' ? 'Not finished' : endDate}</p>
                            </div>
                        </div>
                        <button className='deleteItemBtn' onClick={delProd}>Delete product</button>
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
                    <div className='itemInformation'>
                        <div>
                            <div>
                                {project}
                            </div>
                            <div>
                                {so}
                            </div>
                            <div>
                                {equip}
                            </div>
                        </div>
                        <div>
                            <div>
                                {codeA}
                            </div>
                            <div>
                                {codeB}
                            </div>
                        </div>
                        <div>
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
                        <div className='hipotInfoDiv'>
                            <div className='hipotHeader'>Hipot</div>
                            <div className='hipotGrid'>
                                <div>
                                    <div>Value</div>
                                    <p>{hipotValue}</p>
                                </div>
                                <div>
                                    <div>Model</div>
                                    <p>{hipotModel}</p>
                                </div>
                                <div>
                                    <div>Multimeter</div>
                                    <p>{hipotMultimeterModel}</p>
                                </div>
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