import {createContext, ReactNode, useState, useContext, useEffect} from "react";
export type loginTypes = "standard" | "github" | "facebook" | "google";
// Define the shape of the context
interface AuthContextProp {
  loginGateway: loginTypes,
  setLoginGateway: (gateWay: loginTypes) => void,
  isGoogleLoginFailed: boolean,
  setIsGoogleLoginFailed: (isGoogleLoginFailed: boolean) => void
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
});

export const AuthProvider:React.FC<AuthProviderProp> = ({children}) => {
    // State to store the current login gateway; initialized from localStorage or defaults to "standard"
  const [loginGateway, setLoginGateway] = useState<loginTypes>(() => {
    const gateWayLocalStorage = localStorage.getItem("loginGateway") as loginTypes;
    return gateWayLocalStorage || "standard";
  });
  const [isGoogleLoginFailed, setIsGoogleLoginFailed] = useState<boolean>(false);
  // Effect to update localStorage whenever the login gateway changes
  useEffect(() => {
    localStorage.setItem("loginGateway", loginGateway);
  }, [loginGateway]);
  return (
    <>
      <AuthContext.Provider value={{loginGateway, setLoginGateway, isGoogleLoginFailed, setIsGoogleLoginFailed}}>
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

