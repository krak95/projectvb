import { newItemAXIOS } from "../../API/Axios/axios"
import { useState } from "react"
import socket from '../../API/Socket/socket'
import "./MySQLController.css"

export default function MySQLController() {

    const [project, setProject] = useState('')
    const [batch, setBatch] = useState('')
    const [device, setDevice] = useState('')
    const [codeA, setCodeA] = useState('')
    const [codeB, setCodeB] = useState('')
    const [codePR, setCodePR] = useState('')
    const [codePS, setCodePS] = useState('')
    const [codeDR, setCodeDR] = useState('')
    const [type0, setType0] = useState('')
    const [type1, setType1] = useState('')
    const [type2, setType2] = useState('')
    const [type3, setType3] = useState('')
    const [type4, setType4] = useState('')

    const newItem = async () => {
        const res = await newItemAXIOS({
            'project': project,
            'batch': batch,
            'device': device,
            'codeA': codeA,
            'codeB': codeB,
            'codePR': codePR,
            'codePS': codePS,
            'codeDR': codeDR,
            'type0': type0,
            'type1': type1,
            'type2': type2,
            'type3': type3,
            'type4': type4,
        })
        console.log(res)
    }

    const socketFetchItems = () => {
        socket.emit('')
    }


    return (
        <>
            <div className="mySqlControllerContent">
                <div>
                    <input type="text" placeholder="project" onChange={e => setProject(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="batch" onChange={e => setBatch(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="device" onChange={e => setDevice(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="codeA" onChange={e => setCodeA(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="codeB" onChange={e => setCodeB(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="codePR" onChange={e => setCodePR(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="codePS" onChange={e => setCodePS(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="codeDR" onChange={e => setCodeDR(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="type0" onChange={e => setType0(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="type1" onChange={e => setType1(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="type2" onChange={e => setType2(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="type3" onChange={e => setType3(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="type4" onChange={e => setType4(e.target.value)} />
                </div>
                <div>
                    <button onClick={newItem}>SEND</button>
                </div>
            </div>

            {/* 
            datet,
            fw_version,
            type0,
            type1,
            type2,
            type3,
            type4,
        */}

        </>
    )
}
