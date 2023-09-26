import React, { useState, useRef, useEffect } from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../utils/adminpanel.css';
import useAuth from '../hooks/useAuth';
import axios from '../utils/axios';

function Unauthorized() {


return(

<h1>Unauthorized</h1>

)
}
export default Unauthorized;