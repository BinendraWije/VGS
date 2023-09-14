import { useEffect, useState, useRef } from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../utils/adminpanel.css';

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

// ----------------------------------------------------------------------
// -------Regex constants and URLS-------------------------------------------------

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8-24}$/;

const CREATE_USER_URL = '/createuser';
// ------------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function UserPage() {

  const sectionstyle = {
    marginBottom: "1rem",
    padding: "1rem",
  };

  const userRef = useRef();
  const errRef = useRef();
  
  const [user,setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  
  const [pwd,setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  
  const [matchPwd,setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  
  const [userType,setUserType] = useState('');
  const [validUserType, setValidUserType] = useState(false);
  const [userTypeFocus, setUserTypeFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);


  useEffect(()=>{
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user])

  useEffect(()=>{
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidName(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
    }, [pwd, matchPwd]) 

  useEffect(()=>{
    setErrMsg('');
  }, [user,pwd,matchPwd])


  const submitHandler = async (e)=>{
    e.preventDefault();

    // if button enabled with JS Hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if(!v1 || !v2){
      setErrMsg("Invalid Entry");
      
    }
    try{
      const response = await axios.post(CREATE_USER_URL,
        JSON.stringify({ 
          user_name: user,
          user_pwd: pwd,
          user_role: userType   

        }),{
          headers: {'Content-Type':'application/json'},
          withCredentials: true
        });
        console.log(response.data);
        console.log(response.accessToken);
        console.log(JSON.stringify(response))
        setSuccess(true);
        // clear input fields   
    }
    catch(err){
      if(!err?.response){
        setErrMsg('No server Response');
      } else if (err.response?.status === 409){
        setErrMsg('Username Taken');
      } else{
        setErrMsg('Registration Failed')
      }
      errRef.current.focus();
    }
  }




  return (
    <>
      

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          
        </Stack>
        <Card className='testcard min-w-full flex' style={sectionstyle}>
            <div className="titlefornewusercreation min-w-full">
            Create New User
            </div>
            <div className="formholder">
             <p ref={errRef} className={errMsg ? "errmsg":"offscreen"}>{errMsg}</p> 
             <form onSubmit={submitHandler}>
                <label htmlFor="username"> Username: <span className={validName ? "valid" : "hide"}><FontAwesomeIcon icon={faCheck}/></span><span className={validName || !user ? "hide" : "invalid"}><FontAwesomeIcon icon={faTimes}/></span>
                <input type="text" id="username" ref={userRef} autoComplete='off' onChange={(e)=>setUser(e.target.value)} required onFocus={()=>setUserFocus(true)} onBlur={()=>setUserFocus(false)} /></label>

                <label htmlFor="pwd"> Password: <span className={validPwd ? "valid" : "hide"}><FontAwesomeIcon icon={faCheck}/></span><span className={validPwd || !pwd ? "hide" : "invalid"}><FontAwesomeIcon icon={faTimes}/></span>
                <input type="password" id="pwd" onChange={(e)=>setUser(e.target.value)} required onFocus={()=>setUserFocus(true)} onBlur={()=>setUserFocus(false)} /></label>
              
                <label htmlFor='usertype'>

                User Type: 

                <select value={userType} onChange={(e)=>setUserType(e.target.value)} id="usertype" required  onFocus={()=>setUserTypeFocus(true)} onBlur={()=>setUserTypeFocus(false)}>

                <option value="Admin">Admin</option>

                <option value="Moderator">Moderator</option>

                </select>

                </label>
                <button disabled={!validName && !validPwd}>
                New User
                </button>
              </form> 
            </div>
          
          </Card>
        <Card>
          

        </Card>
      </Container>

    </>
  );
}
