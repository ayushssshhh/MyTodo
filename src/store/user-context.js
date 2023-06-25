import React , {createContext} from "react";

const UserContext = createContext({
    login : false,
    credential : '',
    setTrue : ()=>{},
    setFalse : ()=>{},
    setCredential : ()=>{}
})

export default UserContext