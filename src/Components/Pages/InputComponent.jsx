
import { memo } from "react";
import "../../CSS/InputComponent.css"

 function InputComponent({name,placeholder,onchange,type,value}){
    // console.log(value,name,placeholder,onchange,type);


    return (
        <div className="in">
        <input className="inputField" type={type} placeholder={placeholder} name={name} onChange={onchange} value={value}  />
        </div>
    )
}


export default memo(InputComponent)