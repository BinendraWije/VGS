import { React, useContext, useDebugValue, useState } from 'react'
import AuthContext from "../context/AuthProvider";

import axios from '../utils/axios'


const UserDatapage = () => {
    const { auth } = useContext(AuthContext); 

    const GET_PRODUCT_URL = '/myprofile/';

    const [usera,setUsera] = useState('');

    const getMyprofile =  async (e) => {
    e.preventDefault();
    // get the single product
  try{
    const  userresponse = await axios.get(GET_PRODUCT_URL + auth.user,
      JSON.stringify({ 
      accessToken: auth.accessToken     
    }),{
          // add credentials later once users have been created add token as well
        headers: {'Content-Type':'application/json'},
        withCredentials: true
      });;
    setUsera(userresponse)
    console.log(usera);
  }catch(err){
    console.log(err)
  }
    }

  return (
    <div>
    <h1>UserDatapage</h1>
    <div>
        <h2>user :</h2>   
        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white mx-2" onClick={(e)=>getMyprofile(e)}>
                MY profile
              </button>
      
    </div>
    </div>
   
  )
}

export default UserDatapage