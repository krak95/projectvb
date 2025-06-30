import { NavLink, Outlet } from 'react-router-dom';
export default function PQA() {

    return (
        <>
            <div className='mainNav'>
                <NavLink to='/PQA/Projects'>Projects</NavLink>
                <NavLink to='/PQA/So'>SO</NavLink>
                <NavLink to='/PQA/Equipments'>Equipments</NavLink>
                <NavLink to='/PQA/Issues'>Issues</NavLink>
                <NavLink to='/PQA/PQA'>PQA</NavLink>
            </div>
            <Outlet />
        </>
    )
}