import { useContext, useEffect, useRef, useState } from "react";
import InputComponent from "./InputComponent";
import { productType } from "./ProductsTypes";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../CSS/Update.css"
import ButtomComponent from "./ButtomComponent";
import AlertBox from "../AlertBox";
import { AuthoContext } from "../Authonticate/Authontication";
// import "../../CSS/Update"


export default function Update(){

    let [product,setProduct] = useState({name:"",email:"",mobile:"",designation:"",gender:"",course:"",image:""})
    let [showModel,setShowModel] = useState(false)
    let {isLogin} = useContext(AuthoContext)
    let err= useRef()


    let {pid} = useParams()
    let updatenav = useNavigate()

        
    function changeProduct({target:{name,value}}){
        console.log("enter");
        err.current.innerHTML=""

        setProduct({...product,[name]:value})
    }

    let updateFile = async(e)=>{
        e.preventDefault()
        console.log(product);

        if(!product.name || !product.email || !product.mobile || !product.designation || !product.gender || !product.course || !product.image){
            err.current.innerHTML= "Enter All Field"
        return 
    }
    if(!product.email.endsWith("@gmail.com")){
        err.current.innerHTML="Email must be ends with 'gmail.com' ";
        return
    }
    if(!Number(product.mobile) ){
        err.current.innerHTML="Mobile number must be the number";
        return

    }

    if( product.mobile.length != 10){
        err.current.innerHTML="Mobile number must be 10 digit"
        return
    }
    if(!product.image.endsWith(".png") && !product.image.endsWith(".jpg")){
        err.current.innerHTML="Only 'png' or 'jpg' allow"
        return
    }

        
        try{
        await axios.put(`http://localhost:3000/employees/${pid}`,product)
        setShowModel(true)

    }catch(err){
        console.log(err);
    }
    setTimeout(()=>{
        setShowModel(false)
    },600)
    setTimeout(() => {
        updatenav('/products')
        
    }, 1000);
  
            
    }


    let fetchData = async ()=>{
        
        try{
            let {data} = await axios.get(`http://localhost:3000/employees/${pid}`)
            setProduct(data)
        }catch(err){
            console.log(err);
        }
    }


useEffect(()=>{
    fetchData()
},[])


    return (
        <>
        <div className="alertAdd">
        {showModel && <AlertBox classname="update-message" message={`The Employee '${product.name}' is Updated successfully`} /> }
        </div>
       
        <div >
            <p style={{textAlign:"center",fontSize:"30px",fontWeight:"bolder",backgroundColor:"white",width:"200px",margin:"2px auto"}}>UPDATE</p>
           


        <form onSubmit={updateFile} className="addProducts">
        <div className="error" style={{color:"red"}} ref={err}></div>

            <p className= "fill" style={{textAlign:"center"}}>Update Employee</p>
                <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={product.name}  placeholder="Name" onChange={changeProduct} />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={product.email} placeholder="Email" onChange={changeProduct} />
                </div>
                <div>
                <label htmlFor="mobile" value={product.mobile}>Mobile</label>
                <input type="tel" name="mobile" id="mobile" value={product.mobile} placeholder="Mobile" onChange={changeProduct} />
                </div>

                <div>
                    <label htmlFor="designation"  style={{marginRight:"12px"}}>Designation</label>
                        <select name="designation"  value={product.designation} onChange={changeProduct}>
                            <option  checked={("HR"===product.designation)}  >HR</option>
                            <option  checked={("Manager"===product.designation)}  >Manager</option>
                            <option  checked={("sales"===product.designation)}   >sales</option>
                        </select>
                </div>

                <div className="gender" >
                    <label htmlFor="gender">Gender</label>
                    <input type="radio" name="gender" value="Male" checked={("Male"==product.gender)} id="male" onChange={changeProduct} /><label htmlFor="male">Male</label>
                    <input type="radio" name="gender" value="female" id="female"  onChange={changeProduct} checked={("Female"==product.gender)} /><label htmlFor="female">Female</label>
                </div>

                <div>
                    <label htmlFor="course" value={product.course} >Course</label>
                   <div  className="coursesBox" >
                    <div> <input type="radio" name="course" value="MCA" id="mca"  checked={("MCA"==product.course)} onChange={changeProduct} /> <label htmlFor="mca">MCA</label>  </div>
                   <div> <input type="radio" name="course" value="BCA" id="bca"  checked={("BCA"==product.course)} onChange={changeProduct} /> <label htmlFor="bca">BCA</label>  </div>
                   <div> <input type="radio" name="course" value="BSC" id="bsc"  checked={("BSC"==product.course)} onChange={changeProduct} /> <label htmlFor="bsc">BSC</label>  </div>
                    </div>

                </div>

                <div className="uploadImage">

                    <label htmlFor="imgUpload">Img Upload</label>
                    <input type="file" name="image" id="imgUpload" onChange={changeProduct}  />
                    </div>            

            {/* { productType.map(a=>{
                return (
                    <InputComponent name={a.name} type={a.type} placeholder={a.placeholder} key={a.id} onchange ={changeProduct}/>
                )
                })
            } */}
            <ButtomComponent className="add-message" >Submit</ButtomComponent>


        </form>
       
        </div>
        </>
    )
}