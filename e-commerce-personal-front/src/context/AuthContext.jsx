import { createContext,useContext,useState,useEffect } from "react";

const AuthContext = createContext();

const ApiBaseUrl = "http://localhost:8080";

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null); 
    const [token,setToken] = useState(localStorage.getItem("token") || null);

    useEffect(()=>{
      if(token){
        fetch(`${ApiBaseUrl}/auth/me`,{
          headers:{
            Authrorizaton:`Bearer ${token}`
          }
        })
        .then(res=>res.json())
        .then(data=>{
         if (res.success) setUser(data);
        })
        .catch(()=>{
          setUser(null);
        });
      }
    },[token]);

    const Login= async (email,password)=>{
      const response=await fetch(`${ApiBaseUrl}/auth/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password}) 
        });

        const data=await response.json();
        if(response.ok){
          setToken(data.token);
          localStorage.setIntem("token",data.token);
          return {success:true};
        }
        return false;
    }

    const Logout = () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token"); 
    }

    return(
      <AuthContext.Provider value={{user,token,Login,Logout}}>
        {children}
      </AuthContext.Provider>
    )
  
  
  }
export const useAuth = () => useContext(AuthContext);
