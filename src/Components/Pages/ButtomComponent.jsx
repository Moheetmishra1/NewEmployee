import designbuttom from '../../CSS/buttonComponent.module.css'

export default function ButtomComponent({children,className,onclick= ()=>{}}){
   
    return (
        <button className= {`${designbuttom[className]} ${designbuttom.commonButton}`} onClick={onclick} >{children}</button>
    )
} 

