import { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";

export const GlobalContent = createContext()
export const useAuth = () => useContext(GlobalContent)

export const GlobalProvider = ({ children }) => {
    
    const [project, setProject] = useState('global')


    return (
        <GlobalContent.Provider value={{ project }}>
            {children}
        </GlobalContent.Provider>
    );
}

export default GlobalContent