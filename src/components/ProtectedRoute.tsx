import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await fetch('/api/sessionUp', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Session invalid');
        }
        setHasAccess(true);
      } catch (error) {
        console.log(error);
        navigate('/', { state: { from: location } });
      } finally {
        setIsLoading(false);
      }
    };

    validateSession();
  }, [location, navigate]);
  if (isLoading) {
    return <div>Loading...</div>;

    if (!hasAccess) {
      return null;
    }
  }
  return <Outlet />;
};

export default ProtectedRoute;
