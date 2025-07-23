import { NavLink, Outlet } from "react-router-dom"

export default function Production() {

    return (
        <>
            <div className="mainNav">
                <NavLink to="/Production/Products">Products</NavLink>
                {/* <NavLink to="/Production/Jobs">Jobs</NavLink> */}
                
            </div>
            <Outlet />
        </>
    )
}