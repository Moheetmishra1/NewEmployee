import {  createContext, useState } from "react";

export let AuthoContext = createContext("Provider is not available")

export default function Authonication({children}){
    let [isLogin,setIsLogin] = useState(null)

    let login = (data)=>{
        setIsLogin(data)
    }  
    
    let logout = ()=>{
        setIsLogin(null)
    }

    return <AuthoContext.Provider value={{isLogin,login,logout}} >
        {children }
    </AuthoContext.Provider>
}

