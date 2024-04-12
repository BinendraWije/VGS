import { React, useContext, useDebugValue, useState } from 'react'
import AuthContext from "../context/AuthProvider";

import axios from '../utils/axios'


const UserDatapage = () => {
    const { auth } = useContext(AuthContext);  
    console.log(auth)

    const GET_PRODUCT_URL = '/myprofile/';

    const [usera,setUsera] = useState('');

    const getMyprofile =  async (e) => {
    e.preventDefault();
    // get the single product
  try{
    const  userresponse = await axios.get(GET_PRODUCT_URL + auth.user);
    setUsera(userresponse)
  }catch(err){
    console.log(err)
  }
    }

  return (
    <div>
    <h1>UserDatapage</h1>
    <div>
        <h2>user :{usera}</h2>   
        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white mx-2" onClick={(e)=>getMyprofile(e)}>
                MY profile
              </button>
      
    </div>
    </div>
   
  )
}

export default UserDatapage