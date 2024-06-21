import { useForm } from "react-hook-form"
import ButtomComponent from "./ButtomComponent";



let useErrors= {
    required:{value:true,message:"Username is Mandatory"},
    minLength:{value:6,message:"Username Should Contain Atleast 6 Characters"},
    pattern:{value:/^[A-Za-z]+$/g,message:"Username Shold Contain Only Alphabets"}
}

let passErrors= {
    required:{value:true,message:"Password is Mandatory"},
   minLength:{value:6,message:"Password mare than 6 charcter"}
}


export default function FormData(){
    let {register,reset,formState:{errors},handleSubmit} = useForm()
    

console.log(useForm());
// console.log(typeof register());

let sendform=(data)=>{
  console.log(data);
  reset()
}


    return (
        <div style={{height:"100vh",width:"100vw",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",backgroundColor:"black"}}>
        <form onSubmit={handleSubmit(sendform)} style={{width:"400px",display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center"}} >
           <div>
            <input type="text" placeholder="Username" style={{display:"flex",flexDirection:"column",gap:"5px"}}  {...register("username",useErrors)}  />
            <small style={{color:"red"}}>{errors.username?.message}</small>
           </div>

           <div>
            <input type="password" placeholder="password" style={{display:"flex",flexDirection:"column",gap:"5px"}}  {...register("password",passErrors)} />
            <small style={{color:"red"}}>{errors.password?.message}</small>
           </div>
        <ButtomComponent className="update-message" >Login</ButtomComponent>
        
        </form>
        </div>
    )
}