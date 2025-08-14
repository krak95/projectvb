import { Outlet, NavLink } from "react-router-dom"

export default function Checklists() {

    return (
        <>
            <div className='mainNav' >
                <NavLink to='/Supervisor/Checklists/ChecklistsArchive'>ChecklistsArchive</NavLink>
                <NavLink to='/Supervisor/Checklists/ChecklistsTemplate'>ChecklistsTemplate</NavLink>
            </div>
            <Outlet />
        </>
    )
}