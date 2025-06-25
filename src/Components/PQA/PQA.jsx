import { NavLink, Outlet } from 'react-router-dom';
export default function PQA() {

    return (
        <>
            <div className='mainNav'>
                <NavLink to='/PQA/Issues'>Issues</NavLink>
                <NavLink>PQA</NavLink>
            </div>
            <Outlet />
        </>
    )
}