import { getData } from "../LocalStorage/GetData"
import { logoutAXIOS } from "../../API/Axios/axiosCS"
import { useContext } from "react"
import { setData } from "../LocalStorage/StoreData"

export const logout = async () => {
    const store = getData()
    console.log(store.username)
    try {
        const res = await logoutAXIOS({ username: store.username })
        console.log(res)
        setData({ username: '', token: '', fullname: '' })
        return 'logout'
    } catch (e) {
        console.log(e)
    }
}