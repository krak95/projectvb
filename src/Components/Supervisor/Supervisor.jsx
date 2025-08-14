import { NavLink, Outlet } from "react-router-dom";

export default function Supervisor() {


    return (
        <>
            <div className="mainNav">
                <NavLink to='/Supervisor/WorkWeeks'>WorkWeeks</NavLink>
                <NavLink to='/Supervisor/Checklists'>Checklists</NavLink>
            </div>
            <Outlet />
        </>
    )
}