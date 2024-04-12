import { React, useContext, useDebugValue } from 'react'
import AuthContext from "../context/AuthProvider";

const UserDatapage = () => {
    const { auth } = useContext(AuthContext);
  return (
    <div>
    <h1>UserDatapage</h1>
    <div>
        <h2>user : {auth.user}</h2>
        <h2>pwd : {auth.pwd}</h2>
    </div>
    </div>
   
  )
}

export default UserDatapage