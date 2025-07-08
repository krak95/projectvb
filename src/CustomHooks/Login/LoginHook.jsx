import { getCheckLoginAXIOS } from "../../API/Axios/axiosCS"
import { getData } from "../LocalStorage/GetData"
import { setData } from "../LocalStorage/StoreData"

export const checkLogin = async (e) => {
    console.log(e)
    const storedData = getData()
    console.log(storedData)
    try {
        const res = await getCheckLoginAXIOS({ username: storedData.username, token: storedData.token })
        console.log(res.data[0])
        setData({
            username: res.data[0].username,
            token: res.data[0].token,
            fullname: res.data[0].fullname,
            role: res.data[0].role,
            admin: res.data[0].admin
        })
        console.log(res.data)
        return res.data
    } catch (e) {
        console.log(e)
        return 'error'
    }

}

