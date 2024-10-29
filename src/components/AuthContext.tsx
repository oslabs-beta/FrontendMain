import {createContext, ReactNode, useState, useContext, useEffect, useRef} from "react";
export type loginTypes = "standard" | "github" | "facebook" | "google";
// Define the shape of the context
interface AuthContextProp {
  loginGateway: loginTypes,
  setLoginGateway: (gateWay: loginTypes) => void,
  isGoogleLoginFailed: boolean,
  setIsGoogleLoginFailed: (isGoogleLoginFailed: boolean) => void,
  isGithubLoginFailed: boolean,
  setGithubLoginFailed: (isGithubLoginFailed: boolean) => void,
  clearTokenCheckInterval:() => void,
  startTokenCheckInterval: (tokenValidation:() => Promise<void>) => void
}
interface AuthProviderProp {
  children: ReactNode
}
// Create the AuthContext with default values (placeholders)
export const AuthContext = createContext<AuthContextProp>({
  loginGateway: "standard",
  setLoginGateway: () => {},
  isGoogleLoginFailed:false,
  setIsGoogleLoginFailed: () => {},
  isGithubLoginFailed:false,
  setGithubLoginFailed: () => {},
  clearTokenCheckInterval:() => {},
  startTokenCheckInterval:() => {}
});

export const AuthProvider:React.FC<AuthProviderProp> = ({children}) => {
    // State to store the current login gateway; initialized from localStorage or defaults to "standard"
  const [loginGateway, setLoginGateway] = useState<loginTypes>(() => {
    const gateWayLocalStorage = localStorage.getItem("loginGateway") as loginTypes;
    return gateWayLocalStorage || "standard";
  });
  const [isGoogleLoginFailed, setIsGoogleLoginFailed] = useState<boolean>(false);
  const [isGithubLoginFailed, setGithubLoginFailed] = useState<boolean>(false);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const startTokenCheckInterval = (tokenValidation:() => Promise<void>) => {
    if (intervalId.current) return;
    intervalId.current = setInterval(() => {
      console.log('Checking token...');
      tokenValidation(); 
    }, 5* 60 * 1000); 
  };
  const clearTokenCheckInterval = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      console.log('Token check interval cleared.');
    }
  };
  // Effect to update localStorage whenever the login gateway changes
  useEffect(() => {
    localStorage.setItem("loginGateway", loginGateway);
  }, [loginGateway]);
  return (
    <>
      <AuthContext.Provider value={{loginGateway, setLoginGateway, isGoogleLoginFailed, setIsGoogleLoginFailed,isGithubLoginFailed, setGithubLoginFailed, clearTokenCheckInterval,startTokenCheckInterval}}>
        {children}
      </AuthContext.Provider>
    </>
  )
}
//create a self-defined hook, import it in other components to use
export const useGettingContext = () => {
  const context = useContext(AuthContext);
  return context;
}

