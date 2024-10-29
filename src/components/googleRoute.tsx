import React,{ useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGettingContext } from "./AuthContext";
const API_URL = import.meta.env.VITE_API_URL;
const GoogleRouteCallback: React.FC = ()  => {
  const navigate = useNavigate();
  const {setIsGoogleLoginFailed} = useGettingContext();
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const startTokenCheckInterval = () => {
    intervalId.current = setInterval(async () => {
      try {
        console.log('Checking token...');
        await handleTokenValidation(); //  call handleTokenValidation
      } catch(error) {
        console.log(error,"error in calling handleTokenValid");
      }
      
    }, 5 * 60 * 1000);  //check every 5 minutes
  };

  const handleTokenValidation = async () => {
    const googleAccessToken = localStorage.getItem("googleAccessToken");
    //check if localStorage stored googleAccessToken, if so check if it's valid
    if(googleAccessToken) {
      //checkAccessTokenValidation returns a promise and will always be true, we should get the promise's value either by async await or .then chain to get the response of promise
      checkAccessTokenValidation(googleAccessToken)
      .then(isTokenValid => {
        //promise's value is true, accessToken is valid, navigate to config page;
        if(!isTokenValid) {
          //promise's value is false, accessToken is no longer valid, send back to login page;
          console.log("accessToken in localStorage is invalid or expired, go back to login page");
          //remove googleAccessToken if invalid
          localStorage.removeItem("googleAccessToken");
          navigate('/', {replace:true});
        } else {
          console.log("accessToken in localStorage is valid, transiting to target page");
        }
      }).catch(error => {
        console.log("Error during token validation:", error);
        localStorage.removeItem("googleAccessToken");
        navigate('/', { replace: true });
      })
    } else {
      console.log("No accessToken in localStorage, go back to login page");
      navigate('/', { replace: true });
    }
  };

  const getGoogleAccessToken = async (type:string, code?: string) => {
    //localStorage does not have googleAccessToken, call API to get accessToken from backend
    const googleRefreshToken = localStorage.getItem("googleRefreshToken");
    const body = type === "authorization_code"? { type, code }: { type, googleRefreshToken };
    try {
      const response = await fetch(`${API_URL}/google/oauth/token`, {
        method:"POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
      });
      console.log(response,"response in getting GoogleAccessToken");
      if(!response.ok) {
        console.log("fail to get access token from backend");
        setIsGoogleLoginFailed(true);
        navigate('/', {replace:true});
        return null;
      }
      const { googleToken } = await response.json();
      if(googleToken.access_token) {
        localStorage.setItem("googleAccessToken", googleToken.access_token);
        navigate('/config', {replace: true});
        //get accessToken and start token validation
        await handleTokenValidation();
      }
      if(googleToken.refresh_token) {
        localStorage.setItem("googleRefreshToken", googleToken.refresh_token);
        localStorage.setItem("googleAccessTokenExpireTime", (Date.now() + googleToken.expires_in * 1000).toString());
      }
      //if type is refresh, return renewed accessToken to checkAccessTokenValidation function
      return googleToken.access_token;
    } catch(error){
      setIsGoogleLoginFailed(true);
      console.log(error,"fail to fetch access Token");
      navigate('/config', {replace: true});
      return null;
    }
  };

  //if time to expire is less than 5 minutes, shouldRefreshToken returns true
  const shouldRefreshToken = ():boolean => {
    //localStorage.getItem() can return string | null, if key does not exist, will return null but expire can only accept string
    const expirationTime = parseInt(localStorage.getItem("googleAccessTokenExpireTime") || "",10);
    const timeToExpire = expirationTime - Date.now();
    // if time to expire is less than 5 minutes, return true to refreshToken 
    return timeToExpire < 5 * 60 * 1000;
  };

  const refreshToken = async ():Promise<boolean> => {
    const renewedAccessToken = await getGoogleAccessToken("refresh_token");
    if(renewedAccessToken) {
      console.log("has already refreshed access token");
      //update googleAccessToken to the refreshed one in localStorage
      localStorage.setItem("googleAccessToken", renewedAccessToken);
      return true;
    } else {
      console.log("fail to refresh accessToken");
      return false
    }
  };

  const checkAccessTokenValidation = async (accessToken:string):Promise<boolean> => {
    const isTokenAboutToExpire = shouldRefreshToken();
    // token is about to expire, refresh access token
    if(isTokenAboutToExpire) {
      console.log("about to expire");
      return refreshToken();
    }
    try {
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
      //access token is invalid, refresh access token
      if(!response.ok) {
        console.log("token not valid");
        return refreshToken();
      }
      return true;
    } catch(error) {
      console.log(error, "fail to validate accessToken");
      return false;
    }
  };

  useEffect(() => {
    const query = window.location.search;
    const params = new URLSearchParams(query);
    const code = params.get('code');
    const stateInUrl = params.get('state');
    const stateStored = sessionStorage.getItem("googleOAuthState");
    //safety check for production environment
    if(stateInUrl !== stateStored) {
      console.log('Potential CSRF attack.');
      navigate('/', { replace: true });
      setIsGoogleLoginFailed(true);
      return;
    }
    
    if(code) {
      //no accessToken in localStorage but can get code from URL to get accessToken from backend
      getGoogleAccessToken("authorization_code", code).then(() =>{
        startTokenCheckInterval();
      } );
    } else {
      //check if existing accessToken in localStorage is valid or not
      handleTokenValidation().then(() => {
        startTokenCheckInterval();
      });
      console.log("no code sent back from URL");
    }
    //have to fix the unmount logic later!!!!!!!!!!!!!!
    // return () => {
    //   if (intervalId.current) clearInterval(intervalId.current);
    // };
  }, []);
  return (
    <>
      <p>Processing...</p>
    </>
  )
};
export default GoogleRouteCallback;