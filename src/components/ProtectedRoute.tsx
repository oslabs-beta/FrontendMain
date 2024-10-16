import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const validateSession = async () => {
            try {
                const response = await fetch('/api/sessionUp', {
                    credentials: 'include',
                });
                if(!response.ok) {
                    throw new Error('Session invalid');
                }
            }catch(error) {
                navigate('/', { state: { from: location } });
            } finally{
                setIsLoading(false);
            }
        };

        validateSession();
    }, [location, navigate]);
    if(isLoading) {
        return <div>Loading...</div>
    }
    // Outlet is a placeholder used for rendering nested routes.
    return <Outlet/>;
}

export default ProtectedRoute;