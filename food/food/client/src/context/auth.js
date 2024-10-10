import { useState,useEffect,useContext,createContext } from "react";
import Cookies from 'js-cookie';

const AuthContext = createContext();
const AuthProvider = ({children})=>{
    const [auth,setAuth] = useState({user:null,token:""}); 
    useEffect(()=>{
        const data = Cookies.get("backend_token");
        if(data){
            const parseData = JSON.parse(data);
            setAuth({...auth,user:parseData.user,token:parseData.token,role:parseData.role});
        }
    },[]);
    return(
        <AuthContext.Provider value={[auth,setAuth]}>{children}</AuthContext.Provider>
    );
}
const useAuth = ()=>useContext(AuthContext);


export {useAuth,AuthProvider} ;