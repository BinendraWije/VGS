import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {

    const { auth } = useAuth();
    const location = useLocation();

    if(auth && auth.user_role && auth.user_role.find(user_role => allowedRoles?.includes(user_role))){
        return <Outlet />    
    }else{

      return  <Navigate to = "/signin" state={{ from: location }} replace />  
    }
      
     
} 

export default RequireAuth;