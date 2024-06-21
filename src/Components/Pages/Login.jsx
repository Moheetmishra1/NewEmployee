import { useContext,  useRef,  useState } from "react";
import InputComponent from "./InputComponent";
import ButtomComponent from "./ButtomComponent";
import "../../CSS/Login.css"
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthoContext } from "../Authonticate/Authontication";




export default function Login(){
    let [user,setUser] = useState({userId:"",password:""})
    let {login} = useContext(AuthoContext)
    let loginForm = useRef("")
    let loginAlert  = useRef("")

    let navigateToHome = useNavigate()

    function updateChange({target:{name,value}}){
        setUser({...user,[name]:value})
        loginAlert.current.innerHTML=""
    }

    let loginAccount = async (e)=>{
        e.preventDefault()

        if(user.userId=="" || user.password ==" "){
            console.log("mkjkl");
            loginAlert.current.innerHTML="Enter all field";
            return 
        }

        try{
            let {data} = await axios.get("http://localhost:3000/admin")

            let obj = data.find(a=>{
                return (a.email == user.userId && a.confirmPassword=== user.password)
            })
            if(obj){
                localStorage.setItem("admin",JSON.stringify(obj.fullName))
                login(obj);
                navigateToHome('/dashbord')
    
            }else{
                loginAlert.current.innerHTML = "Invalid password or userId";
                loginForm.current.style.boxShadow = "1px 2px 30px red"
                setTimeout(()=>{
                loginForm.current.style.boxShadow = "none"

                },800)
            }
        }catch(err){
            console.log(err);   
            
        }    
    }



    return (
        <div className="login-Box">
               
        <form onSubmit={loginAccount} ref={loginForm} className="login-form">
        <div className="loginAlert" ref={loginAlert}>
                    
                    </div>
            <img src="../../../public/images/login-image.jpg" alt="" style={{borderRadius:"10%",height:"200px",width:"266px",marginTop:"-2px"}} />
            <p className="login-head">Login</p>
            <InputComponent name="userId" placeholder="Enter Email" type="email" onchange={updateChange} />
            <InputComponent name="password" placeholder="Enter password" type="password" onchange={updateChange} />
            <small>Forgot password</small>
            <ButtomComponent className="login-buttom" >Login</ButtomComponent>
            <NavLink to='/signup' className="alreadyAc">Don't have an account</NavLink>
       
        </form>
        </div>
    )
}