
    import { useContext, useState } from "react"
    import {checkName,checkEmail,checkPassword,checkMobile,  validateForm } from "../helper/validate"
    import InputComponent from "./InputComponent"
    import ButtomComponent from "./ButtomComponent"
    import axios from "axios"
    import { NavLink, useNavigate } from "react-router-dom"
    import { AuthoContext } from "../Authonticate/Authontication"




    export default function SignUp(){

        let [fdata,setFdata] = useState({fullName:"",password:"",confirmPassword:"",email:"",mobile:""})
        let [FormError,setFormError] = useState({})
        let navigateToLogin= useNavigate()
        let {login} = useContext(AuthoContext)




        function updateChange({target:{value,name}}){
            setFdata({...fdata,[name]:value.trim()})
            switch(name){
                case "fullName" :{FormError.fullName =checkName(value.trim()); break;}
                case "email" :{FormError.email=checkEmail(value.trim()); break;}
                case "password" :{FormError.password=checkPassword(value.trim()); break;}
                case "mobile" :{FormError.mobile = checkMobile(value.trim()); break;}
            }     
        }


        let createAccount = async ()=>{
            try{
                await axios.post("http://localhost:3000/admin",fdata)
            }catch(err){
                console.log(err);
            }
            login(fdata)
            localStorage.setItem("admin",JSON.stringify(fdata.fullName))
            navigateToLogin("/dashbord")

        }

        let updateForm = (e)=>{
            e.preventDefault()
        
            let obj = validateForm(fdata)

            setFormError(obj)

            if(Object.keys(obj).length === 0){
                createAccount()           
            }else{
                return
            }        


        }
        

        return (    
            <div className="signup-Box" >
            <form  className="signupForm" onSubmit={updateForm}>
                <img src="../../public/Images/ecommerce-signup.jpg" alt="" />
                <p style={{color:"red",fontWeight:"bold"}}>Create a new account.</p>
            <InputComponent name="fullName" placeholder="Full name"  type="text" onchange={updateChange} /> 
            <small style={{color:"red"}} >{FormError.fullName}</small>

            <InputComponent name="email" placeholder="Email" type="email" onchange={updateChange} /> 
            <small style={{color:"red"}} >{FormError.email}</small>

            <InputComponent name="mobile" placeholder="Mobile" type="text" onchange={updateChange} /> 
            <small style={{color:"red"}} >{FormError.mobile}</small>

            <InputComponent name="password" type="password" placeholder="password" onchange={updateChange} /> 
            <small style={{color:"red"}} >{FormError.password}</small>

            <InputComponent name="confirmPassword" placeholder="confirm password" type="password" onchange={updateChange} /> 
            <small style={{color:"red"}} >{FormError.confirmPassword}</small>

            <ButtomComponent className="createAccount">Create Account</ButtomComponent>
            <NavLink to='/login' className="log">Already have an account ?</NavLink>


            </form>
            </div>
            
        )
    }
