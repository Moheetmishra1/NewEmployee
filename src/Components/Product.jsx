import { useNavigate } from "react-router-dom";
import "../CSS/Product.css"
import ButtomComponent from "./Pages/ButtomComponent"
import axios from "axios";

export default function Product({pname,price,color,qty,imageurl,index,id,fetchProducts}){
   let navigatorView = useNavigate()
   let navigatorUpdate= useNavigate()
//    let newUpdate= useNavigate()
  


    let view = ()=>{
      navigatorView(`/productdetails/${id}`)
    }

    let update=()=>{
        navigatorUpdate(`/update/${id}`)
       
    }

    let  Delete= ()=>{
       let {data} =  axios.delete(`http://localhost:3000/products/${id}`)
       console.log(data);
       fetchProducts()
       
    }
    console.log("Product");

    return (
        <>
            <tr align="center"key={index} className="product">
            <td>{index +1 }</td>
           <td> <img src= {`${imageurl[0]}`} alt="" /> </td>
            <td className="price">{pname} </td>
            <td>{price}</td>
            <td>{color}</td>
            <td>{qty}</td>
           
            <td ><ButtomComponent className = "view" onclick={()=>{view()}} >View</ButtomComponent></td>
            <td><ButtomComponent className = "update"  onclick={()=>{update()}} >Update</ButtomComponent></td>
            <td><ButtomComponent className = "delete"  onclick={()=>{Delete()}} >Delete</ButtomComponent></td>

            </tr>
        </>
    )

}