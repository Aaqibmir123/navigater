import React, { useContext } from 'react'
import Authcontext from '../Context/Authcontext'
// import { useHistory } from "react-router-dom"

export const Logout = () => {
   const authctx = useContext(Authcontext);
//    const history = useHistory();

   const remove=()=>{
    authctx.logout();
    // history.replace('/');
   }
  return (
    
    <button onClick={remove}>Logout</button>
  )
}
