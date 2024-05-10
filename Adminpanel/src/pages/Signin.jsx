import React, { useState, useRef, useEffect } from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../utils/adminpanel.css';
import useAuth from '../hooks/useAuth';
import axios from '../utils/axios';
import Cookies from 'js-cookie';
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
import googleLoginHandler from '../utils/googleloginhandler';
import { GoogleLogin } from '@react-oauth/google';
import { decode } from 'jsonwebtoken';


const LOGIN_URL = "/auth";
const GOOGLE_LOGIN_URL = "/googlesigninrequest";


function Signin() {
  const { setAuth, persist, setPersist } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const from = location.state?.from?.pathname || "/";


  const[user, setUser] = useState('');
  const[pwd, setPwd] = useState('');
  const[errMsg, setErrMsg] = useState('');

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
    const accessToken = response?.data?.accessToken;
    const user_role = response?.data?.user_role;
    setAuth({user, pwd, user_role, accessToken});
    setUser('')
    setPwd('')
    navigate(from, {replace : true});
    
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
const handleGoogleLogin = async (e)=>{
  e.preventDefault();
  try {
   //googleLoginHandler();
   //const response = await axios.post(GOOGLE_LOGIN_URL)
   //console.log(response);
   //console.log(response.data);
   //console.log(response.data.url);
   window.open('http://ec2-13-49-145-29.eu-north-1.compute.amazonaws.com:3306/passportgoogle', "_self");
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

const togglePersist = () => {
  setPersist(prev => !prev);
}

useEffect(()=>{
  localStorage.setItem("persist", persist);
}, [persist])

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
          <button className='btn' >Sign in</button>          
          <div className="persistCheck">
            <input type="checkbox" id="persist" onChange={togglePersist} checked={persist}/>
            <label htmlFor='persist'> Trust This Device </label>
            </div> 
          </form>
            <GoogleLogin
            //REferrer policy setting on the front end
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);                    
                  }}
                  onError={() => {
                    console.log('Login Failed');
                        }}                    
            />
          </Card>
         </div>
          </div>
        </main>

  
      </div>
    </div>
  );
}

export default Signin;