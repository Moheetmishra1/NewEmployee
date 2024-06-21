import axios from "axios";
import React, { memo, useEffect, useState } from "react"
import Product from "../Product";
// import '../../CSS/Products.css'
// import "../../CSS/productss.css"
import "../../CSS/Products1.css"
import ButtomComponent from "./ButtomComponent";
import '../../CSS/ProductDetails.css'
import { Navigate, useNavigate } from "react-router-dom";
import AlertBox from "../AlertBox";



 function Products(){
    // console.log(design);
    let [products,setPtoducts] = useState([]);
    let [showModel,setShowModel] = useState(false)
    let [search , setSearch]= useState([])
    let [sortList,setSort] = useState("none")

    function updateSearch({target:{value}}){
        // setSearch(value)
        console.log(value);
        let p = products.filter((a)=>{
            let obj =(Object.values(a)+"").toLowerCase()

                return obj.includes(value.toLowerCase());

        })
        setSearch(p)
    }


    let navigatorHome = useNavigate()
   let navigatorUpdate= useNavigate()

    

    let fetchProducts= async ()=>{
       

        try{
            
            let {data} = await axios.get("http://localhost:3000/employees");
           
            setPtoducts(data)
        }catch(err){
            console.log(err);
        }
    }


    useEffect(()=>{
        fetchProducts()
    },[])



   

      let update=(id)=>{
          navigatorUpdate(`/update/${id}`)
         
      }
  
      let  Delete= async (id)=>{
        try{
         await axios.delete(`http://localhost:3000/employees/${id}`)
         setShowModel(true)
        }catch(err){
            console.log(err);
        }
        
        setTimeout(()=>{
            setShowModel(false)
        },800)
        setTimeout(() => {
            fetchProducts()
            
        }, 1100);       
      }


    return (
        <div className="updateWall">
         <div className="alertAdd">
            <div className="employeesList">Employee List</div>
        {showModel && <AlertBox classname="delete-message" message={`The Employee detail is deleted successfully`} /> }
        </div>

        {/* <div className="sort">
        <label htmlFor="designation" value={sortList} style={{marginRight:"12px"}}>Designation</label>
                        <select name="sortList"  onChange={changeSort}>
                            <option   >name</option>
                            <option >email</option>
                            <option  >id</option>
                            <option >date</option>
                        </select>
        </div> */}

        <div className="totalCount" >
        <span className=""  style={{border:"1px solid black",margin:"0px 40px"}}>Total count:{products.length}</span>
        <button onClick={()=>{
             navigatorHome("/")
        }}>Create Employee</button>
        </div>

        <div className="searchText"><p>Search</p> <input type="search" placeholder="Enter Search Keyword" onKeyUp={updateSearch}     /></div>

    <div className="divProducts">
        <p className="message" style={{display:"none"}} >Deleted successfully</p>
        <div style={{width:"100%"}}>
            <table cellSpacing="20%" style={{margin:"4px auto"}} >
                <thead><tr >
                <th>Unique ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No.</th>
                <th>Designation</th>
                <th>gender</th>
                <th>Course</th>
                <th>create date</th>
                <th></th>Action</tr></thead>
                <tbody>

                {search[0] && search.map((a,index)=>{
            return (
                <tr align="center"key={index} className="prduct" >
                <td>{a.id }</td>
               <td> <img src= {`${a.imageurl[0]}`} alt="" height="50px" width="50px" /> </td>
                <td className="price">{a.name} </td>
                <td style={{color:"blue"}}>{a.email}</td>
                <td>{a.mobile}</td>
                <td>{a.designation}</td>
                <td>{a.gender}</td>
                <td>{a.course}</td>
                <td>{a.createDate}</td>


               
                {/* <td  ><ButtomComponent className = "view" onclick={()=>{view(a.id)}} >View</ButtomComponent></td> */}
                <td ><ButtomComponent className = "update"  onclick={()=>{update(a.id)}} >Update</ButtomComponent></td>
                <td ><ButtomComponent className = "delete-message"  onclick={()=>{Delete(a.id)}} >Delete</ButtomComponent></td>
    
                </tr>
                // <Product {...a} key={a.id} index={index} fetchProducts={fetchProducts} />
            )
        })}






        {!search[0] && products.map((a,index)=>{
            return (
                <tr align="center"key={index} className="prduct" >
                <td>{a.id }</td>
               <td> <img src= {`${a.imageurl[0]}`} alt="" height="50px" width="50px" /> </td>
                <td className="price">{a.name} </td>
                <td style={{color:"blue"}}>{a.email}</td>
                <td>{a.mobile}</td>
                <td>{a.designation}</td>
                <td>{a.gender}</td>
                <td>{a.course}</td>
                <td>{a.createDate}</td>


               
                {/* <td  ><ButtomComponent className = "view" onclick={()=>{view(a.id)}} >View</ButtomComponent></td> */}
                <td ><ButtomComponent className = "update"  onclick={()=>{update(a.id)}} >Update</ButtomComponent></td>
                <td ><ButtomComponent className = "delete-message"  onclick={()=>{Delete(a.id)}} >Delete</ButtomComponent></td>
    
                </tr>
                // <Product {...a} key={a.id} index={index} fetchProducts={fetchProducts} />
            )
        })}
          </tbody>
        </table>
        </div>
    </div>  
    </div>  
    )
}


export default memo(Products)