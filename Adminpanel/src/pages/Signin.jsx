import React, { useState, useRef, useEffect, useContext } from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../utils/adminpanel.css';
import AuthContext from '../context/AuthProvider';
import axios from '../utils/axios';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';


const LOGIN_URL = "/auth";

function Signin() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const[user, setUser] = useState('');
  const[pwd, setPwd] = useState('');
  const[errMsg, setErrMsg] = useState('');
  const[success, setSuccess] = useState(false);

  useEffect(()=>{
    userRef.current.focus();
  }, [ ])

    useEffect(()=>{
      setErrMsg('');
    }, [user,pwd]);

const handleSubmit = async (e)=>{
  e.preventDefault();

  try {
    const response = await axios.post(LOGIN_URL,
      JSON.stringify({ 
        user_name: user,
        user_pwd: pwd
      }),{
        headers: {'Content-Type':'application/json'},
        withCredentials: true
      })
    console.log(JSON.stringify(response))        
    const accessToken = response?.data?.accessToken;
    const roles = response?.data?.roles;
    setAuth({user, pwd, roles, accessToken});
    setUser('')
    setPwd('')
    setSuccess(true);
  } catch (err) {
    if(!err?.response){
      setErrMsg('No server response');
    }else if(err.response?.status === 400){
      setErrMsg('Missing Username or Password');
    }else if(err.response?.status === 401 ){
      setErrMsg('Unauthorized');
    }else{
      setErrMsg('Login Failed');
    }
    errRef.current.focus();  

  }

}

  return (
    <div className="flex h-screen overflow-hidden">
  
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto flex flex-col items-center	">
            <div className="signinformholder flex flex-col justify-center w-2/4">       
          <Typography variant="h4" gutterBottom>
            Sign in
          </Typography>
          <Card className='signincard min-w-full flex justify-center'>
          <p ref={errRef} className={errMsg ? "errmsg":"offscreen"}>{errMsg}</p> 
           <form onSubmit={handleSubmit} className=' flex flex-col'>
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" ref={userRef} autoComplete='off' onChange={(e)=>setUser(e.target.value)} value={user} required/>
            <label htmlFor="pwd">Password: </label>
            <input type="password" id="pwd" autoComplete='off' onChange={(e)=>setPwd(e.target.value)} value={pwd} required/>
          <button>Sign in</button>
          </form>
          </Card>
         </div>
          </div>
        </main>

  
      </div>
    </div>
  );
}

export default Signin;