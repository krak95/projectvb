import { NavLink, Outlet } from "react-router-dom";

export default function Supervisor() {


    return (
        <>
            <div className="mainNav">
                <NavLink to='/Supervisor/WorkWeeks' >WorkWeeks</NavLink>
            </div>
            <Outlet />
        </>
    )
}