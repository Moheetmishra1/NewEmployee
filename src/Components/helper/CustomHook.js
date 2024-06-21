import { useContext } from "react"
import { AuthoContext } from "../Authonticate/Authontication"

export let useCustomLoginInfo = ()=>{
    let {islogin,login,logout} = useContext(AuthoContext)
    console.log(islogin);

    return {islogin,login,logout}
}