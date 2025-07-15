import { useLocation } from "react-router-dom";
import { useState } from "react";
import { fetchProductionAXIOS } from "../../../API/Axios/axiosCS";
export default function WeekDetails() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const ww_number = queryParams.get('ww_number');


    const [prodArray, setProdArray] = useState([])
    const [quantDone, setQuantDone] = useState(0)
    const fetchProd = async () => {
        const res = await fetchProductionAXIOS({
            Project: '',
            So: '',
            Equipment: '',
            CodeA: '',
            CodeB: '',
            CodePR: '',
            CodePS: '',
            CodeDR: '',
            Type0: '',
            Type1: '',
            Type2: '',
            Type3: '',
            Type4: '',
            Tester: '',
            ww_number: ww_number
        })
        console.log(res)
        setProdArray(res.data)
        setQuantDone((res.data).length)
    }

    return (
        <div>
            {prodArray.map((e, key) =>
                <div>
                    {e.equipment}
                </div>

            )}
        </div>
    )
}