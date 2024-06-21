import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../CSS/ProductDetails.css'


export default function ProductsDetails(){
    let [de,setDetail] = useState({id:"",pname:"",price:"",color:"",desc:"",qty:"",imageurl:"",category:""})
    let {pid} = useParams()
    // let NavigateToProducts = useNavigate()

  let viewDetails = async ()=>{

    try{
    let {data} = await axios.get(`http://localhost:3000/products/${pid}`)
    console.log(data);
    setDetail(data)
    }catch(err){
        console.log(err);
    }
}

    useEffect(()=>{
        viewDetails()
    },[])


    return (
        <div className="WallForProductsSetails">
            <div className="circle"></div>
        <div className="ProductDetails">
            <div className="details">
                <div className="category"><span className="material-symbols-outlined" style={{fontSize:"25px"}}>bolt</span> Node</div>
                <p style={{fontSize:"60px",letterSpacing:"2px",margin:"5px",fontWeight:"bold"}}> {de.category}</p>
                <p style={{fontSize:"60px",fontWeight:"bold",color:"gold"}}>{de.pname}</p>

                <p style={{margin:"10px"}}>desc: {de.desc ||"N/A"}</p>
                <p className="priceDetails"><small>₹</small> {de.price}</p>
                <div className="buy"><p>Buy now   </p><div className="arrow">🛒</div> </div>
            </div>
            <div>
                
            <img src={de.imageurl[0]} alt="" className="singleDetailImage" />
            </div>
        </div>
        </div>
    )
}