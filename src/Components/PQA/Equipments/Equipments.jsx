import { useEffect, useState } from "react"
import { newEquipAXIOS, fetchEquipmentsAXIOS } from "../../../API/Axios/axiosCS"
import socket from "../../../API/Socket/socket"
import './Equipments.css'

export default function Equipments() {

    const [EquipName, setEquipName] = useState('')

    const newEquip = async () => {
        socket.emit('newEquip')
        console.log('newproject')
        try {
            const res = await newEquipAXIOS({
                'EquipName': EquipName
            })
            console.log(res.data)
        } catch (error) {
            console.error("Error:", error.res?.data || error.message);
        }
    }

    const [equipsArray, setEquipsArray] = useState([])
    const fetchEquips = async () => {
        const res = await fetchEquipmentsAXIOS({ EquipName: '' })
        setEquipsArray(res.data)
        console.log(res)
    }

    socket.on("fetchEquips", () => {
        console.log('socketfetch')
        fetchEquips()
    })
    useEffect(() => {
        fetchEquips()
    }, [])

    return (
        <>
            <div className="pqaEquipMainDiv">
                <div className="pqaNewEquip">

                    <input placeholder="Equip name" type="text" onChange={e => setEquipName(e.target.value)} />
                    <button className="sendBtn" onClick={e => newEquip(e)}>New   Equipment</button>
                </div>
                <div className="pqaEquipList">
                    <div className="pqaEquipListHeaders">
                        <div>Equipment Name</div>
                    </div>

                    {equipsArray.map((e, key) =>
                        <div>
                            <div>
                                {e.equipName}
                            </div>
                        </div>
                    )
                    }
                </div>
            </div >
        </>
    )
}