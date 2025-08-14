import { createChecklistsTemplateAXIOS, fetchChecklistsTemplateAXIOS, fetchEquipmentsAXIOS, fetchProjectsAXIOS } from "../../../../API/Axios/axiosCS"
import { useEffect, useState } from "react"
import "./ChecklistsTemplate.css"
import socket from "../../../../API/Socket/socket"
import $ from 'jquery'

export default function ChecklistsTemplate() {

    const [project, setproject] = useState('')
    const [equipment, setequipment] = useState('')
    const [action, setaction] = useState('')
    const [type0, settype0] = useState('')
    const [type1, settype1] = useState('')
    const [type2, settype2] = useState('')
    const [type3, settype3] = useState('')
    const [type4, settype4] = useState('')

    const createChecklists = async () => {
        try {
            const res = await createChecklistsTemplateAXIOS({ project, equipment, action, type0, type1, type2, type3, type4 })
            console.log(res)
            socket.emit('createChecklistsTemplate')
        } catch (e) {
            console.log(e)
        }
    }

    const [checklistTemplateArr, setchecklistTemplateArr] = useState([])
    const fetchChecklistsTemplate = async () => {
        try {
            const res = await fetchChecklistsTemplateAXIOS({
                project,
                equipment,
                type0,
                type1,
                type2,
                type3,
                type4
            })
            setchecklistTemplateArr(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    const [projectArr, setProjectArr] = useState([])
    const fetchProjects = async () => {
        try {
            const res = await fetchProjectsAXIOS({
                project: '',
                country: '',
                proj_manager: '',
                client_name: ''
            })
            console.log(res)
            setProjectArr(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    const [equipArr, setEquipArr] = useState([])
    const fetchEquipments = async () => {
        try {
            const res = await fetchEquipmentsAXIOS({
                EquipName: ''
            })
            console.log(res)
            setEquipArr(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    const [showCreateChecklists, setshowCreateChecklists] = useState(false)
    const setCreateChecklists = () => {
        if (showCreateChecklists === false) {
            // $('.searchDiv').css('display', 'flex')
            $('.checklistsTemplateInputDiv').animate({
                height: "76px"
            }, 50, function () {
            });
            setshowCreateChecklists(!showCreateChecklists)
        } else {
            // $('.searchDiv').css('display', 'none')
            $('.checklistsTemplateInputDiv').animate({
                height: "0"
            }, 50, function () {

            });
            setshowCreateChecklists(!showCreateChecklists)
        }
    }



    useEffect(() => {
        fetchProjects()
        fetchEquipments()
        socket.on('fetchChecklistsTemplate', () => {
            fetchChecklistsTemplate()
        })
    }, [])


    useEffect(() => {
        fetchChecklistsTemplate()
    }, [
        project,
        equipment,
        type0,
        type1,
        type2,
        type3,
        type4
    ])

    return (
        <div className="checklistsTemplateMainDiv">
            <div>
                <button onClick={e => setCreateChecklists()}>Create ChecklistTemplate</button>
            </div>
            <div className="checklistsTemplateInputDiv">
                <div>
                    <div>
                        <select onChange={e => setproject(e.target.value)} name="" id="">
                            <option value=""></option>
                            {projectArr.map((e, key) =>
                                <option key={e.id_proj} value={e.project}>{e.project}</option>

                            )}
                        </select>
                    </div>
                    <div>
                        <select onChange={e => setequipment(e.target.value)} name="" id="">
                            <option value=""></option>
                            {equipArr.map((e, key) =>
                                <option key={e.idequipments} value={e.equipName}>{e.equipName}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <select name="" id="" onChange={e => settype0(e.target.value)}>
                            <option value=""></option>
                            <option value="Start">Start</option>
                            <option value="Middle">Middle</option>
                            <option value="End">End</option>
                        </select>
                    </div>
                    <div>
                        <select name="" id="" onChange={e => settype1(e.target.value)}>
                            <option value=""></option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                        </select>
                    </div>
                    <div>
                        <select name="" id="" onChange={e => settype2(e.target.value)}>
                            <option value=""></option>
                            <option value="Standard">Standard</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="PRM">PRM</option>
                        </select>
                    </div>
                    <div>
                        <select name="" id="" onChange={e => settype3(e.target.value)}>
                            <option value=""></option>
                            <option value="IN">IN</option>
                            <option value="OUT">OUT</option>
                        </select>
                    </div>
                    <div>
                        <select name="" id="" onChange={e => settype4(e.target.value)}>
                            <option value=""></option>
                            <option value="SCP">SCP</option>
                            <option value="SBG">SBG</option>
                            <option value="ABC">ABC</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        <input placeholder="action" className="checklistTemplateActionInput" onChange={e => setaction(e.target.value)} type="text" />
                    </div>
                    <div>
                        <button onClick={createChecklists}>Create ChecklistTemplate</button>
                    </div>
                </div>
            </div>


            <div className="checklistsTemplateGridMainDiv">
                <div>
                    <div className="checklistsTemplateGridMainDivHeaders">
                        <div>Project</div>
                        <div>Equipment</div>
                        <div>Type0</div>
                        <div>Type1</div>
                        <div>Type2</div>
                        <div>Type3</div>
                        <div>Type4</div>
                        <div>Action</div>
                    </div>
                    {checklistTemplateArr.map((e, key) =>
                        <div className="checklistsTemplateListDiv">
                            <div className="checklistsTemplateList">
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
                                        {e.type0}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        {e.type1}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        {e.type2}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        {e.type3}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        {e.type4}
                                    </div>
                                </div>
                                <div>
                                    <div >
                                        {e.action}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}