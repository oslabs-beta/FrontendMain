import React, { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {useGettingContext, loginTypes} from './AuthContext';
const ProtectedRoute: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {loginGateway } = useGettingContext();
    useEffect(() => {
        //in typescript, this function should have a default return value, or this function may return undefined if we pass in a argument does not
        const getApiEndpoints = (loginGateway: loginTypes):void => {
            if(loginGateway === "github") {
                validateGithubJwt();
                return;
            } 
            if(loginGateway ==="google") {
                //login with google skip protectedRoute check, it's logic is complicated in endpoint '/oauth/google'
                return;
            }
            validateSession();
        };
        const validateSession = async () => {
            try {
                const response = await fetch('/api/sessionUp', {
                    credentials: 'include',
                });
                if(!response.ok) {
                    throw new Error('Session invalid');
                }
               
            }catch(error) {
                console.log(error, "error in normal sessionUp frontend");
                navigate('/', { state: { from: location } });
            } 
        };
        const validateGithubJwt = async () => {
            const jwtToken = localStorage.getItem("githubJwtToken");
            if(!jwtToken) {
                navigate('/', { state: { from: location } });
                return;
            }
            try {
                const response = await fetch('/api/githubJwtValidation',  {
                    headers: {
                      Authorization:`Bearer ${jwtToken}` 
                    }
                 });
                 //response.json() can only be called once! should be called before checking response data, cannot call it once fail and once success
                 const responseBody = await response.json();
                 console.log(responseBody,"response body");
                 if(!response.ok) {
                    // if jwtToken is expired,return 401 status, call refreshJwtToken
                    if(response.status === 401) {
                        const newJwtAfterRefreshed = await refreshJwtToken();
                        if(newJwtAfterRefreshed) {
                            localStorage.setItem("githubJwtToken", newJwtAfterRefreshed);
                            await validateGithubJwt();
                        } else {
                            //if response returned from refreshJwtToken is null, go back to login page
                            navigate('/', { state: { from: location } });
                        }
                    } else {
                        //if jwtToken is invalid, go back to login page
                        navigate('/', { state: { from: location } });
                        console.log(responseBody, 'JWT validation failed');
                        throw new Error(responseBody.err);
                    }
                 }
                 
            } catch(error) {
                navigate('/', { state: { from: location } });
                console.log(error,"error in calling jwt validation front end");
            } 
        };
        const refreshJwtToken = async () => {
            const jwtRefreshToken = localStorage.getItem("githubRefreshJwtToken");
            if(!jwtRefreshToken) {
                console.log("no refreshToken found in localStorage");
                return null;
            }
            try {
                //usually use post method to refresh jwt token
                const response = await fetch("/api/githubRefreshJwtToken", {
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtRefreshToken}`
                    }
                });
                console.log(response,"response refresh github jwt");
                const responseData = await response.json();
                if(!response.ok) {
                    console.log(responseData, "data in refresh jwt failure");
                    return null;
                }
                console.log(responseData,"success data sent back in refreshing jwt");
                return responseData.newJwt;
            } catch(error) {
                console.log(error,"error in refreshing jwt validation front end");
                return null;
            }
        };
        getApiEndpoints(loginGateway);
    }, [location]);
    // Outlet is a placeholder used for rendering nested routes.
    return <Outlet/>;
}

export default ProtectedRoute;
