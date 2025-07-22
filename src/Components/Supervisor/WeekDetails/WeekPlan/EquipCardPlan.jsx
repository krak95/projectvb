import { useEffect, useState } from "react"
import { fetchProductionEquipCardAXIOS } from "../../../../API/Axios/axiosCS"
import socket from "../../../../API/Socket/socket"



export default function EquipCardPlan(props) {
    const [quantity_done, setQuantity_done] = useState('')
    const fetchProd = async () => {
        const res = await fetchProductionEquipCardAXIOS({
            project: props.project,
            equipment: props.equipment,
            ww_number: props.ww_number
        })
        console.log(res)
        setQuantity_done((res.data).length)
    }



    useEffect(() => {
        socket.on('fetchProduction', () => {
            fetchProd()
        })
    }, [])

    useEffect(() => {
        fetchProd()
        console.log(props)
    }, [])

    return (
        <>
            <div style={{ color: 'var(--secondary)' }}>
                {props.equipment}
            </div>
            <div>
                Need: {props.qn}
            </div>
            <div>
                Done: {quantity_done}
            </div>

            <div>
                Left: {props.qn - quantity_done}
            </div>
            <div className="statusLight" style={
                ((props.qn - quantity_done) / props.qn) > .5
                    ? { backgroundColor: 'var(--red)' }
                    : ((((props.qn - quantity_done) / props.qn) <= .5 && ((props.qn - quantity_done) / props.qn) > 0)
                        ? { backgroundColor: 'yellow' }
                        : ((props.qn - quantity_done === 0)
                            ? { backgroundColor: 'green' }
                            : null))

            }>

            </div >
        </>
    )
}