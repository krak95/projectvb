import { useState, createContext, useContext, useEffect } from "react";
import { getData } from "../CustomHooks/LocalStorage/GetData";
import { setData } from "../CustomHooks/LocalStorage/StoreData";


export const GlobalContent = createContext()
export const useAuth = () => useContext(GlobalContent)

export const GlobalProvider = ({ children }) => {

    const [authorized, setAuthorized] = useState(null)
    const [swapRegisterLogin, setswapRegisterLogin] = useState('login')
    const [path, setPath] = useState(null)
    const [menu, setMenu] = useState('click')

    console.log(authorized)

    const storedData = getData()
    if (!storedData) {
        localStorage.setItem('User', JSON.stringify({
            'username': '',
            'token': '',
            'fullname': ''
        }))
    }

    const setPathGlobal = (e) => {
        console.log('Global Path: ', e)
        setPath(e)
    }
    useEffect(() => {
    }, [])

    const authorizing = (e) => {
        setAuthorized(e)
    }

    const swapRegisterLoginF = (e) => {
        setswapRegisterLogin(e)
        console.log(e)
    }

    return (
        <GlobalContent.Provider value={{ authorized, setAuthorized, authorizing, swapRegisterLoginF, setswapRegisterLogin, swapRegisterLogin, setPathGlobal, path, setPath, menu, setMenu }}>
            {children}
        </GlobalContent.Provider>
    );
}

export default GlobalContent