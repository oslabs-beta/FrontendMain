import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
interface ProtectedRouteProps {
    children: React.ReactNode
}
const ProtectedRoute: React.FC <ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
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
            }
        };

        validateSession();
    }, [location]);
    return children;
}

export default ProtectedRoute;