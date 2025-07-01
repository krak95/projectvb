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
                        <input placeholder="Equip name" type="text" onChange={e => setEquipName(e.target.value)} />
                    </div>
                    <div>
                        <button className="sendBtn" onClick={e => newEquip(e)}>New Equipment</button>
                    </div>
                </div>
                <div className="pqaEquipList">
                    <div className="pqaEquipListHeaders">
                        <div>Equipment Name</div>
                        <input type="text" name="" id="" onChange={e => setEquipSearch(e.target.value)} />
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