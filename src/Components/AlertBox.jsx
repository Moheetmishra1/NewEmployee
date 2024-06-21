
// import '../CSS/AlertBox.css'
import "../CSS/AlertBox.css"
import { memo, useEffect, useState } from 'react'


 function AlertBox({message,classname}){
    
    return (
        <div className={`popup ${classname}`}>
            {message}
        </div>
    )

}


export default memo(AlertBox)