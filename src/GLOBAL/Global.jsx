import { useState, createContext, useContext, useEffect } from "react";
import { getData } from "../CustomHooks/LocalStorage/GetData";
import { setData } from "../CustomHooks/LocalStorage/StoreData";


export const GlobalContent = createContext()
export const useAuth = () => useContext(GlobalContent)

export const GlobalProvider = ({ children }) => {

    const [authorized, setAuthorized] = useState(null)

    console.log(authorized)

    const storedData = getData()
    if (!storedData) {
        localStorage.setItem('User', JSON.stringify({
            'username': '',
            'token': '',
            'fullname': ''
        }))
    }

    const authorizing = (e) => {
        setAuthorized(e)
    }

    return (
        <GlobalContent.Provider value={{ authorized, setAuthorized, authorizing }}>
            {children}
        </GlobalContent.Provider>
    );
}

export default GlobalContent