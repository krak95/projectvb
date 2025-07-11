import { useEffect, useState } from "react"
import { newEquipAXIOS, fetchEquipmentsAXIOS, deleteEquipAXIOS } from "../../../API/Axios/axiosCS"
import socket from "../../../API/Socket/socket"
import './Equipments.css'
import { getData } from "../../../CustomHooks/LocalStorage/GetData"

export default function Equipments() {

    const [EquipName, setEquipName] = useState('')

    const [alert, setAlert] = useState('')


    const [admin, setAdmin] = useState(0)
    const getAdmin = () => {
        const res = getData()
        setAdmin(res.admin)
        console.log(res)
    }

    useEffect(() => {
        getAdmin()
    }, [])

    const deleteBtn = async (e) => {
        const res = await deleteEquipAXIOS({ idequipments: e })
        console.log(res)
        socket.emit('newEquip')
    }


    const newEquip = async () => {
        socket.emit('newEquip')
        console.log('newproject')
        try {
            const res = await newEquipAXIOS({
                'EquipName': EquipName
            })
            console.log(res.data)
        } catch (error) {
            if ((error.request.response).includes('Duplicate')) {
                setAlert('Duplicate')
            }
        }
    }

    const [equipsArray, setEquipsArray] = useState([])
    const [equipSearch, setEquipSearch] = useState('')

    const fetchEquips = async () => {
        const res = await fetchEquipmentsAXIOS({ EquipName: equipSearch })
        setEquipsArray(res.data)
        console.log(res)
    }

    socket.on("fetchEquips", () => {
        console.log('socketfetch')
        fetchEquips()
    })

    useEffect(() => {
        fetchEquips()
    }, [equipSearch])

    return (
        <>
            <div className="pqaEquipMainDiv">
                <div className="pqaNewEquip">
                    <div>
                        <input
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    newEquip()
                                }
                            }}
                            style={alert === 'Duplicate' ? { backgroundColor: 'var(--red)' } : null} placeholder="Equip name" type="text" onChange={e => setEquipName(e.target.value)} />
                    </div>
                    <div>
                        <button className="sendBtn" onClick={e => newEquip(e)}>New Equipment</button>
                    </div>
                </div>
                <div className="pqaEquipList">
                    <div className="pqaEquipListHeaders" style={admin === 0 ? null : { gridTemplateColumns: 'repeat(2, calc(100%/2))' }} >
                        <div>Equipment Name</div>
                        <input type="text" name="" id="" onChange={e => setEquipSearch(e.target.value)} />
                    </div>

                    {equipsArray.map((e, key) =>
                        <div style={admin === 0 ? null : { gridTemplateColumns: 'repeat(2, calc(100%/2))' }} >
                            <div>
                                {e.equipName}
                            </div>
                            {admin === 0 ? null :
                                <div>
                                    <span onClick={a => deleteBtn(e.idequipments)}>Delete</span>
                                </div>
                            }
                        </div>
                    )
                    }
                </div>
            </div >
        </>
    )
}