import React, { useState } from "react"
const Authcontext=React.createContext({
    token:'',
    islogined:false,
    login:(token)=>{},
    logout:()=>{},
     emailid: '',

})

export const Authcontextprovider=(props)=>{
    const intialtoken=localStorage.getItem('token');
    const existedemail=localStorage.getItem('email')
    const [token,settoken]=useState(intialtoken);
    const [email,setemail]=useState(existedemail);
    const userlogined=!!token;

    const userLogin=(token)=>{
        settoken(token);
        setemail(email);
        localStorage.setItem('token',token);
        localStorage.setItem('email',email);
    }

    const userLogout=()=>{
        settoken(null);
        setemail('');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }

 const cardcontext={
    token:token,
    islogined:userlogined,
    login:userLogin,
    logout:userLogout,
    emailid:email
 }

    return(
        <Authcontext.Provider value={cardcontext}>
            {props.children}
        </Authcontext.Provider>
    )
}
export default Authcontext;