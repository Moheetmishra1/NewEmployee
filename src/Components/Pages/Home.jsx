import { useRef, useState } from "react"
import design from "../../CSS/Home.module.css"
import {productType} from "./ProductsTypes"
import { faker } from '@faker-js/faker';
import InputComponent from "./InputComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtomComponent from "./ButtomComponent";
import AlertBox from "../AlertBox";

let months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export default function Home(){
    let [product,setProduct] = useState({name:"",email:"",mobile:"",designation:"",gender:"",course:"",image:""})
    let [showModel,setShowModel] = useState(false)
    let navigatorToProduct= useNavigate()
    let err= useRef()
    
    function changeProduct({target:{name,value}}){
       
        setProduct({...product,[name]:value})
        err.current.innerHTML=""
    }
    
    console.log(product);

    function randomImage5(){
            let arr=[]
            for(let i=1;i<=5;++i){
                arr.push(faker.image.avatar())
            }
            return arr
    }

    let transfer = async (e)=>{
        e.preventDefault()
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

            let arr = await axios.get("http://localhost:3000/employees")
            let bool = arr.some(a=>{
                return a.email=== product.email
            })

            if(bool){
                err.current.innerHTML="Email already exist"
                return
            }
        }catch(er){
                console.log(er);
        }
        

        product.imageurl=randomImage5();
        try{
            let date= new Date();
            product.createDate=`${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`
            await axios.post("http://localhost:3000/employees",product)
            setShowModel(true)
        }catch(err){
            console.log(err);
        }
        setTimeout(()=>{
            setShowModel(false)
        },800)
        setTimeout(() => {
            navigatorToProduct('/products')
            
        }, 1000);
 }
   
    return (
        <> 
        <h1 className="dash" style={{margin:"1px"}}>Create Employee</h1>

        <div className={design.alertAdd}>{showModel && <AlertBox classname="added-message" message={`The Employee '${product.name}' is added successfully`} /> }</div>
        {/* <AlertBox message="Product is successfully added" diplay={display}  /> */}
        <form onSubmit={transfer} className={design.addProducts}>
            <div className="error" style={{color:"red"}} ref={err}></div>
            <p className={design.fill} style={{textAlign:"center"}}>Add Employee</p>
                <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder="Name" onKeyUp={changeProduct} />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" placeholder="Email" onKeyUp={changeProduct} />
                </div>
                <div>
                <label htmlFor="mobile">Mobile</label>
                <input type="tel" name="mobile" id="mobile" placeholder="Mobile" onKeyUp={changeProduct} />
                </div>

                <div>
                    <label htmlFor="designation" style={{marginRight:"12px"}}>Designation</label>
                        <select name="designation"  onClick={changeProduct}>
                            <option   >HR</option>
                            <option >Manager</option>
                            <option  >sales</option>
                        </select>
                </div>

                <div className={design.gender}>
                    <label htmlFor="gender">Gender</label>
                    <input type="radio" name="gender" value="Male" id="male" onClick={changeProduct} /><label htmlFor="male">Male</label>
                    <input type="radio" name="gender" value="female" id="female" onClick={changeProduct}/><label htmlFor="female">Female</label>
                </div>

                <div>
                    <label htmlFor="course">Course</label>
                   <div  className={design.coursesBox} >
                    <div> <input type="radio" name="course" value="MCA" id="mca" onClick={changeProduct} /> <label htmlFor="mca">MCA</label>  </div>
                   <div> <input type="radio" name="course" value="BCA" id="bca" onClick={changeProduct} /> <label htmlFor="bca">BCA</label>  </div>
                   <div> <input type="radio" name="course" value="BSC" id="bsc" onClick={changeProduct} /> <label htmlFor="bsc">BSC</label>  </div>
                    </div>

                </div>

                <div className={design.uploadImage}>

                    <label htmlFor="imgUpload">Img Upload</label>
                    <input type="file" name="image" id="imgUpload" onChange={changeProduct} />
                    </div>            

            {/* { productType.map(a=>{
                return (
                    <InputComponent name={a.name} type={a.type} placeholder={a.placeholder} key={a.id} onchange ={changeProduct}/>
                )
                })
            } */}
            <ButtomComponent className="add-message" >Submit</ButtomComponent>


        </form>
        </>
       

    )
}