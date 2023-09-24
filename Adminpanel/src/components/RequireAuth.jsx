import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ThemeProvider from "../utils/ThemeContext";

const RequireAuth = ({ allowedRoles }) => {

    const { auth } = useAuth();
    const location = useLocation();

    if(auth && auth.roles && auth.roles.find(role => allowedRoles?.includes(role))){
        return <Outlet />    
    }else{

      return  <Navigate to = "/signin" state={{ from: location }} replace />  
    }
      
     
} 

export default RequireAuth;