import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditMenu from '../../components/DropdownEditMenu';
import { Link } from 'react-router-dom';


import Image01 from '../../images/avatar_1.jpg';
import Image02 from '../../images/avatar_3.jpg';
import Image03 from '../../images/avatar_4.jpg';
import Image04 from '../../images/avatar_6.jpg';
import Image05 from '../../images/avatar_8.jpg';
import Image06 from '../../images/avatar_9.jpg';
import Image07 from '../../images/avatar_10.jpg';
import Image08 from '../../images/avatar_12.jpg';
import Image09 from '../../images/avatar_13.jpg';
import Image10 from '../../images/avatar_15.jpg';
import defaultimage from '../../images/upload-image-icon.webp';

import axios from '../../utils/axios' 
import bcrypt from 'bcryptjs';


// ----------------------------------------------------------------------
// -------Regex constants and URLS-------------------------------------------------

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;


const CREATE_USER_URL = '/createuser';
const GET_PRODUCTS_URL = '/products';
const DELETE_USER_URL = '/deleteuser/';
const EDIT_USER_URL = '/edituser/';
// ------------------------------------------------------------------------

// ----------------------------------------------------------------------

function Productdashboard() {

  const sectionstyle = {
    marginBottom: "1rem",
    padding: "1rem",
  };

  const ProductRef = useRef();
  const productDescriptionRef = useRef();
  const productImageRef = useRef();
  const productPriceRef = useRef();
  const productTypeRef = useRef();
  const errRef = useRef();

  const [product,setProduct] = useState('');
  const [productDescription,setProductDescription] = useState('');
  const [productImage,setProductImage] = useState('');
  const [productType,setProductType] = useState('');
  const [productPrice,setProductPrice] = useState('');

  const [ProductFocus, setProductFocus] = useState(false);
  const [ProductDescriptionFocus, setProductDescriptionFocus] = useState(false);
  const [ProductImageFocus, setProductImageFocus] = useState(false);
  const [ProductTypeFocus, setProductTypeFocus] = useState(false);
  const [ProductPriceFocus, setProductPriceFocus] = useState(false);

  const [userFocus, setUserFocus] = useState(false);
  
  const [pwd,setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  
  const [validUserType, setValidUserType] = useState(false);
  const [userTypeFocus, setUserTypeFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editUsername, setEditUsername] = useState('');


  useEffect(()=>{
    if(success){
    setTimeout(()=>{setSuccess(false);},10000);
           }
  }, [success])


/////////////////// CREATE USER FUNCTION //////////////////////////////

  const submitHandler = async (e)=>{
    e.preventDefault();

    // if button enabled with JS Hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if(!v1 || !v2){
      setErrMsg("Invalid Entry");
      
    }
    try{
       
      const response = await axios.post(CREATE_PRODUCT_URL,
        JSON.stringify({ 
          product_name: product,
          product_description: productDescription,
          product_image: productImage,
          product_type: productType   

        }),{
          headers: {'Content-Type':'application/json'},
          // add credentials later once users have been created add token as well
          withCredentials: false
        });
        console.log(response.data);
        console.log(response.accessToken);      
        console.log(JSON.stringify(response));
        setSuccess(true);
        // clear input fields   
    }
    catch(err){
      if(!err?.response){
        setErrMsg('No server Response');
      } else if (err.response?.status === 409){
        setErrMsg(' Username taken');
      } else{
        setErrMsg('Registration Failed')
      }
      errRef.current.focus();
    }
  }


/////////////////// GET ALL PRODUCTS FUNCTION //////////////////////////////
 
  const [products, setProducts] = useState([])
  const [productTypes,setProductTypes] = useState([]);

  const fetchproducts = async () =>{

      try{
    const  productsresponse = await axios.get(GET_PRODUCTS_URL);
    setProducts(productsresponse.data.products);
    setProductTypes(productsresponse.data.producttypes);
    console.log(productsresponse.data.products);
    console.log(productsresponse.data.producttypes);
      }
      catch(err){
        console.log(err)
      }
    }
  useEffect(()=>{
  
    fetchproducts();
  },[]);

/////////////////// DELETE USER FUNCTION //////////////////////////////

  const deleteHandler = async (e, user_name)=>{
    e.preventDefault();
    const user = user_name;
    
try{
    await axios.delete(DELETE_USER_URL + user,
     {
        headers: {'Content-Type':'application/json'},
        // add credentials later once users have been created add token as well
        withCredentials: false
      });
    }
    catch(err){
      if(!err?.response){
        setErrMsg('No server Response');
      } else{
        setErrMsg('Delete Failed')
      }
      errRef.current.focus();
    }
    fetchpost();
  }


/////////////////// EDIT USER FUNCTION //////////////////////////////

const editUser =  async (e, user_name, user_role) => {
  e.preventDefault();
  const user = user_name;
  const userrole = user_role;
  setUser(user);
  userRef.current.value = user;
  pwdRef.current.value = "*********";
  setUserType(userrole);
  userTypeRef.current = userrole;
  setEditUsername(user);
  setEditMode(true);
}
/// set the current user info onto the create user form

/// set all the titles and add button text based off of whether or not youre in the edit function or not 

const editSubmitHandler = async (e) =>{
  e.preventDefault();

 // if button enabled with JS Hack
 const v1 = USER_REGEX.test(user);
 const v2 = PWD_REGEX.test(pwd);
 if(!v1 || !v2){
   setErrMsg("Invalid Entry");
   
 }

  try{  
    const hash = await bcrypt.hash(pwd,10);
    console.log(hash);      
    const response = await axios.post(EDIT_USER_URL + editUsername,
      JSON.stringify({ 
        user_name: user,
        user_pwd: hash,
        user_role: userType   

      }),{
        headers: {'Content-Type':'application/json'},
        // add credentials later once users have been created add token as well
        withCredentials: false
      });
      console.log(response.data);
      console.log(response.accessToken);      
      console.log(JSON.stringify(response));
      setSuccess(true);
      // clear input fields   

  }catch(err){
    if(!err?.response){
      setErrMsg('No server Response');
    } else{
      setErrMsg('Edit Failed')
    }
    errRef.current.focus();
  }
  setEditMode(false);
  fetchpost();
}
  
///////////////// temp image preview setup ////////////////////////////
  const [files, setFiles] = useState();
  const [previews, setPreviews] = useState();
  const [pic1, setPic1] = useState();
  const [pic1preview, setPic1preview] = useState();

  useEffect(() => {
    if (!pic1) return;   
  
    const pic1ObjectUrl = URL.createObjectURL(pic1[0]);
    setPic1preview(pic1ObjectUrl);

    // free memory
    //URL.revokeObjectURL(pic1ObjectUrl);     
    
  }, [pic1]);


  useEffect(() => {
    if (!files) return;
    let tmp = [];
    for (let i = 0; i < files.length; i++) {
      tmp.push(URL.createObjectURL(files[i]));
    }
    const objectUrls = tmp;
    setPreviews(objectUrls);

    // free memory
    for (let i = 0; i < objectUrls.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrls[i]);
      };
    }
  }, [files]);



  return (
    <>
      {/* Create a Product section */}
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
     <div className='testcard min-w-full flex flex-col col-span-full xl:col-span-12' style={sectionstyle}>
      <header className="py-4 border-b border-slate-100 dark:border-slate-700">
        {editMode ?
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Edit Product</h2>  
          :
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">Add Product</h2>   }
        </header>
        {editMode ?
        <div className="successfailnotification">
            <p id="uidnote" className={success ? "successmsg" : "offscreen"}>
              <FontAwesomeIcon icon={faCheck}/>  
                Product Successfully edited!                            
                        </p>                                                
            </div>
            :
            <div className="successfailnotification">
            <p id="uidnote" className={success ? "successmsg" : "offscreen"}>
              <FontAwesomeIcon icon={faCheck}/>  
                Product Successfully created!                            
                        </p>                                                
            </div>
            
            }
            <div className="formholder min-w-full">
             <p ref={errRef} className={errMsg ? "errmsg":"offscreen"}>{errMsg}</p> 
             <form onSubmit={editMode? editSubmitHandler : submitHandler}>
             <div className="addproductformholder flex-nowrap  grid grid-cols-2">
              <div className="productdetailssection flex flex-col p-10 flex-nowrap xl:col-span-1 col-start-1 ">
                <div className="productformfield flex flex-col">
                <label className='mx-1 my-2 flex flex-col' htmlFor="productname"> Product Name:
                <input type="text" id="productname" ref={ProductRef} autoComplete='off' onChange={(e)=>setProduct(e.target.value)} required  onFocus={()=>setProductFocus(true)} onBlur={()=>setProductFocus(false)} /></label>
                </div>

                <div className="productformfield flex flex-col">
                <label className='mx-1 my-2 flex flex-col' htmlFor="productdescription"> Product description: 
                <textarea rows="5" id="productdescription" ref={productDescriptionRef} autoComplete='off' onChange={(e)=>setProductDescription(e.target.value)} required  onFocus={()=>setProductDescriptionFocus(true)} onBlur={()=>setProductDescriptionFocus(false)} /></label>
                </div>
                <div className="productformfield ">
                <label className='mx-1 my-2 flex flex-col' htmlFor="Price"> Price: 
                <input className='priceinput' type="number" min="0.01" step="0.01" max="2500" id="Price" ref={productPriceRef} autoComplete='off' onChange={(e)=>setProductPrice(e.target.value)} required  onFocus={()=>setProductPriceFocus(true)} onBlur={()=>setProductPriceFocus(false)} /></label>
                </div>

                <div className="productformfield flex flex-col">
                <label  className='mx-1 my-2 flex flex-col' htmlFor='Producttype'>

                Product Type: 

                <select className='mx-1 my-2 flex flex-col' value={productType}  ref={productTypeRef} onChange={(e)=>setProductType(e.target.value)} id="Producttype" required  onFocus={()=>setProductTypeFocus(true)} onBlur={()=>setProductTypeFocus(false)}>
              {
                productTypes.map(producttype => {
                  return (
                    <option value={producttype.product_type_name}>{producttype.product_type_name}</option>
                  )
                  })
                }
                        

                </select>

                </label>
                </div>
                </div>
                <div className="productimagessection flex flex-col p-10 flex-nowrap xl:col-span-1 col-start-2">
                <label className='mx-1' htmlFor="productname"> Product Images Upload : </label>
              
              <div className="imageholdersection flex flex-row">
                <div className="imageholder flex flex-col mx-2 items-center	content-center relative" 
                onDragOver={(event)=>{event.preventDefault(); console.log("someone dragged something"); event.dataTransfer.dropEffect ="copy";}}
                onDragLeave={(event)=>{event.preventDefault(); }}
                onDrop={(event)=>{event.preventDefault();console.log("someone dropped something"); if (event.dataTransfer.files) setPic1(event.dataTransfer.files); }}
                                >
              { pic1preview ?
               <img className='object-cover' src={pic1preview} /> 
              :
              <img className='defaultimage'src={defaultimage}/>
           
            }
            { pic1 ? 
               <></>
              :
              <p>or Drag and Drop an image</p>

            }            
              <label htmlFor="picchooser" className={pic1? "picreplacebtn" : "picchooserbtn"}>{pic1? "Replace" : "Click to Upload"}</label>
            {
              pic1? 
              <button className="picremovebtn" onClick={()=>{setPic1(null); setPic1preview(null)}}>Remove</button>
              :
              <></>
            }
               <input  id="picchooser" className='hidden' type="file" accept="image/jpg, image/jpeg, image/png" onChange={(e) => { if (e.target.files) { setPic1(e.target.files); } }}/>
               </div>
               <div className="imageholder flex flex-col mx-2" >
               { pic1preview ?
               <img className='object-cover' src={pic1preview} /> 
              :
              <img />
            }
               <input className='hidden' type="file" accept="image/jpg, image/jpeg, image/png" onChange={(e) => { if (e.target.files) { setPic1(e.target.files); } }}/>
               </div>
               <div className="imageholder flex flex-col mx-2 ">
               { pic1preview ?
               <img className='object-cover' src={pic1preview} /> 
              :
              <img />
            }
               <input className='hidden' type="file" accept="image/jpg, image/jpeg, image/png" onChange={(e) => { if (e.target.files) { setPic1(e.target.files); } }}/>
               </div>
               <div className="imageholder flex flex-col mx-2">
               { pic1preview ?
               <img className='object-cover' src={pic1preview} /> 
              :
              <img />
            }
               <input  className='hidden' type="file" accept="image/jpg, image/jpeg, image/png" onChange={(e) => { if (e.target.files) { setPic1(e.target.files); } }}/>
               </div>
                             
              </div>
              </div>
              </div>
             {editMode ? 
             <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white mx-2" >
                 <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                     <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                 </svg>
                 <span className="hidden xs:block ml-2">Edit Product</span>
             </button>                
              : 
              <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white mx-2">
              <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="hidden xs:block ml-2">Create Product</span>
          </button>    
           }
              </form> 
            </div>
            <div className="errholder">
            <p id="uidnote" className={"offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        <p id="pwdnote" className={"offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
            </div>
          </div>
          
    </div>

    <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Products</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Product Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Product Type</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center"></div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
             { 
                products.map(product => {
                  return (
                    <tr key={product.Product_ID}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-30 h-30 shrink-0 mr-2 sm:mr-3">
                            <img src={new URL('../../images/Products/' + product.Product_Image +'.jpg', import.meta.url).href}  width="70" height="70" alt={product.Product_Name} />
                          </div>
                          <div className="font-medium text-slate-800 dark:text-slate-100">{product.Product_Name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{product.Product_Type}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500"></div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
   {/* Menu button */}
   <EditMenu align="right" className="relative inline-flex">
            <li>
              <button className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3" to="#0" onClick={(e)=>editUser(e, product.Product_Name, product.Product_Type)}>
                Edit
              </button>
            </li>
            <li>
              <button className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3" to="#0">
                Ban
              </button>
            </li>
            <li>
              <button className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0" onClick={(e)=> deleteHandler(e, product.Product_Name)}>
                Delete
              </button>
            </li>
          </EditMenu>
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

export default Productdashboard;
