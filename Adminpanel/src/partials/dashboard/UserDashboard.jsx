import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';
import axios from '../../utils/axios' 

// ----------------------------------------------------------------------
// -------Regex constants and URLS-------------------------------------------------

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8-24}$/;

const CREATE_USER_URL = '/createuser';
// ------------------------------------------------------------------------

// ----------------------------------------------------------------------

function UserDashboard() {

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
          headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'http://13.49.145.29:3000'},
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

  const customers = [
    {
      id: '0',
      image: Image01,
      name: 'Alex Shatov',
      email: 'alexshatov@gmail.com',
      location: '🇺🇸',
      spent: '$2,890.66',
    },
    {
      id: '1',
      image: Image02,
      name: 'Philip Harbach',
      email: 'philip.h@gmail.com',
      location: '🇩🇪',
      spent: '$2,767.04',
    },
    {
      id: '2',
      image: Image03,
      name: 'Mirko Fisuk',
      email: 'mirkofisuk@gmail.com',
      location: '🇫🇷',
      spent: '$2,996.00',
    },
    {
      id: '3',
      image: Image04,
      name: 'Olga Semklo',
      email: 'olga.s@cool.design',
      location: '🇮🇹',
      spent: '$1,220.66',
    },
    {
      id: '4',
      image: Image05,
      name: 'Burak Long',
      email: 'longburak@gmail.com',
      location: '🇬🇧',
      spent: '$1,890.66',
    },
  ];

  return (
    <>
      {/* Create a User section */}
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
     <div className='testcard min-w-full flex flex-col col-span-full xl:col-span-12' style={sectionstyle}>
      <header className="py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Create New Users</h2>
        </header>
            <div className="formholder min-w-full">
             <p ref={errRef} className={errMsg ? "errmsg":"offscreen"}>{errMsg}</p> 
             <form onSubmit={submitHandler}>
                <label className='mx-1' htmlFor="username"> Username: <span className={validName ? "valid" : "hide"}><FontAwesomeIcon icon={faCheck}/></span><span className={validName || !user ? "hide" : "invalid"}><FontAwesomeIcon icon={faTimes}/></span>
                <input type="text" id="username" ref={userRef} autoComplete='off' onChange={(e)=>setUser(e.target.value)} required onFocus={()=>setUserFocus(true)} onBlur={()=>setUserFocus(false)} /></label>

                <label className='mx-1' htmlFor="pwd"> Password: <span className={validPwd ? "valid" : "hide"}><FontAwesomeIcon icon={faCheck}/></span><span className={validPwd || !pwd ? "hide" : "invalid"}><FontAwesomeIcon icon={faTimes}/></span>
                <input type="password" id="pwd" onChange={(e)=>setUser(e.target.value)} required onFocus={()=>setUserFocus(true)} onBlur={()=>setUserFocus(false)} /></label>
              
                <label  className='mx-1' htmlFor='usertype'>

                User Type: 

                <select className='mx-1' value={userType} onChange={(e)=>setUserType(e.target.value)} id="usertype" required  onFocus={()=>setUserTypeFocus(true)} onBlur={()=>setUserTypeFocus(false)}>

                <option value="Admin">Admin</option>

                <option value="Moderator">Moderator</option>

                </select>

                </label>
               
             
             <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white mx-2" disabled={!validName && !validPwd}>
                 <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                     <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                 </svg>
                 <span className="hidden xs:block ml-2">Create User</span>
             </button>                
           
              </form> 
            </div>
          </div>
          
    </div>

    <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Users</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Spent</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Country</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                customers.map(customer => {
                  return (
                    <tr key={customer.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src={customer.image} width="40" height="40" alt={customer.name} />
                          </div>
                          <div className="font-medium text-slate-800 dark:text-slate-100">{customer.name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{customer.spent}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{customer.location}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
    </>
  );
}

export default UserDashboard;
