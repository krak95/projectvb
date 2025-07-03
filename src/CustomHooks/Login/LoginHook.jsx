import { getCheckLoginAXIOS } from "../../API/Axios/axiosCS"
import { getData } from "../LocalStorage/GetData"
import { setData } from "../LocalStorage/StoreData"

export const checkLogin = async (e) => {
    console.log(e)
    const storedData = getData()
    console.log(storedData)
    try {
        const res = await getCheckLoginAXIOS({ username: storedData.username, token: storedData.token })
        setData({
            username: res.data[0].username,
            token: res.data[0].token,
            fullname: res.data[0].fullname
        })
        console.log(res.data[0].username)
        return res.data
    } catch (e) {
        console.log(e)
        return 'error'
    }

}

