import { Navigate } from "react-router-dom"
import { useCustomLoginInfo } from "../helper/CustomHook"
import { useContext } from "react";
import { AuthoContext } from "../Authonticate/Authontication";


export default function ProtectedDashBord({children}){
    let {isLogin} = useContext(AuthoContext)
    // let {islogin} = useCustomLoginInfo()
    // console.log(isLogin);


    if(isLogin){
        return <>{children}</>
    }else{
        return <Navigate to="/login" />
    }


    


}