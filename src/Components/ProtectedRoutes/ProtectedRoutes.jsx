import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../GLOBAL/Global';

export const ProtectRoutes = () => {
    const { authorized } = useAuth()

    setTimeout(() => {
        if (authorized !== 1) {
            return <Navigate to='/' />
        }
    }, 400);
    if (authorized === null) return <div style={{ color: 'var(--light)' }}>Loading...</div>
    return (
        authorized === 1 ? <Outlet /> : <Navigate to='/' />
    )
};
