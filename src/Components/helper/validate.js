 export let checkName =(fullName)=>{
    let fullnameRegex = /^[a-zA-Z ]+$/g
    if(fullName === ""){
        return "Enter full name"
    }else if(fullName.length <6){
        return "Full name contain atlest 6 alphabet "
    }else if(! fullnameRegex.test(fullName)){
        return "Name must contain only alphabet";
    }
return ""
 }

 export let checkEmail = (email)=>{
    
    if(email === ""){
        return "Email is Mandatory"
    }else if(!email.endsWith("@gmail.com")){
        return "Email id must be Gmail"
    }
    return ""
 }
 
 export let checkPassword =(password)=>{
    let pass = /^[a-zA-Z0-9]+$/g

    if(password === ""){
        return "Enter your password"
    }else if (! (password.length>7 && password.length<16) ){
        return "Password length must be in between 8 to 15"
    }else if ( ! pass.test(password)){
        return "Password must contain aplhabet and number"
    }else{
        let lower= false;
        let upper =false;
        let num = false;
        for(let i of password){
            if(lower && upper && num){break}
            if(i>='a'&& i<='z'){
               lower= true
               
            }
            if(i >='A' && i <='Z'){upper=true}
            if(i >=0 && i<=9 ){num=true}

        }
       if(!lower){return 'password must contain atleast one lowercase alphabet'}
       else if(!upper){return 'password must contain atleast one uppercase alphabet'}
       else if (!num){return 'password must contain atleast one number'}
        
    }
    return ""
 }

 export let checkMobile = (mobile)=>{
    let mob=  /^[7-9]\d{9}$/ ;

    if (mobile === "") {
        return  "Mobile number Is Mandatory"
    }else if(!Number(mobile)){
    return 'mobile contains only numbers'
    }
    else if (mobile.length !== 10) {
        return  "Mobile contain only 10 digit Numbers"
    }
   else if(! mob.test(mobile)) {
    return  "Mobile number must start with 7 or 8 or 9"

    }
return ""

 }
 
 
 
 let validateForm = ({fullName,password,confirmPassword,email,mobile})=>{
    
    let err = {}
    let fullnameRegex = /^[a-zA-Z ]+$/g
 
    let mob=  /^[7-9]\d{9}$/ ;
    let pass = /^[a-zA-Z0-9]+$/g
    // let mail = /^[a-zA-Z0-9.]+$/g
   


    if(fullName === ""){
        err.fullName="Enter full name"
    }else if(fullName.length <6){
        err.fullName="Full name contain atlest 6 alphabet "
    }else if(! fullnameRegex.test(fullName)){
        err.fullName="Name must contain only alphabet";
    }

    if(email === ""){
        err.email="Email is Mandatory"
    }else if(!email.endsWith("@gmail.com")){
        err.email="Email id must be Gmail"
    }

    if(password === ""){
        err.password = "Enter your password"
    }else if (! password.length>7 && password.length<16 ){
        err.password = "Password length must be in between 8 to 15"
    }else if ( ! pass.test(password)){
        err.password="Password must contain aplhabet and number"
    }else{
        let lower= false;
        let upper =false;
        let num = false;
        for(let i of password){
            if(lower && upper && num){break}
            if(i>='a'&& i<='z'){
               lower= true
               
            }
            if(i >='A' && i <='Z'){upper=true}
            if(i >=0 && i<=9 ){num=true}

        }
       if(!lower){err.password='password must contain atleast one lowercase alphabet'}
       else if(!upper){err.password='password must contain atleast one uppercase alphabet'}
       else if (!num){err.password='password must contain atleast one number'}
        
    }

    if(confirmPassword===""){
        err.confirmPassword="Confim password is empty"
    }else  if(password !== confirmPassword ){
            err.confirmPassword = "Confirm password is not matching"
    }
   

    if (mobile === "") {
        err.mobile = "Mobile number Is Mandatory"
    }else if(!Number(mobile)){
        err.mobile='mobile contains only numbers'
    }
    else if (mobile.length !== 10) {
        err.mobile = "Mobile contain only 10 digit Numbers"
    }
   else if(! mob.test(mobile)) {
        err.mobile= "Mobile number must start with 7 or 8 or 9"

    }

    return err
}

let userIdval= /^[a-zA-Z0-9.]+$/g ;
let loginValidation = (data)=>{

    let err={}
    if(data.userId===""){
        err.userId="UserId is empty"
    }
    if(!data.endsWith("@gmail.com")){
        err.userId = "Only '@gmail.com' mail domain is allows"
    }else if (!userIdval.test(data.slice(0,data.lastIndexOf('@')))){
        return "only aplhabet and number allows in email"
    }

    return ""; 

    
}


export {loginValidation,validateForm}