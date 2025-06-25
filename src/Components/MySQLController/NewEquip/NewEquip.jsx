import { useState } from "react"
import { newEquipAXIOS } from "../../../API/Axios/axiosCS"
import socket from "../../../API/Socket/socket"

export default function NewEquip() {

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

    return (
        <>
            <div>
                <input placeholder="Equip name" type="text" onChange={e => setEquipName(e.target.value)} />
            </div>

            <div>
                <button className="sendBtn" onClick={e => newEquip(e)}>Add Project</button>
            </div>
        </>
    )
}