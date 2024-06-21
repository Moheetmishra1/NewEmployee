import { Navigate, useNavigate } from "react-router-dom";
import { AuthoContext } from "./Authonticate/Authontication";
import { useCustomLoginInfo } from "./helper/CustomHook";
import { useContext } from "react";


export default function ProtectedProducts({children}){
    let {isLogin} = useContext(AuthoContext)
    // console.log("enter");
    // console.log(isLogin);
    
    if(isLogin){
        return <>{children}</>
    }else{

        return <Navigate to='/login' />
    }

}