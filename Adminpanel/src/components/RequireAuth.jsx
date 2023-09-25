import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {

    const { auth } = useAuth();
    const location = useLocation();

    console.log("I'm here on the adminpanel after checking the userroles");
    if(auth && auth.user_role && allowedRoles.includes(user_role)){
        console.log("found the userroles");
        return <Outlet />    
    }else{
      console.log("I couldnt find the userroles");
      return  <Navigate to = "/signin" state={{ from: location }} replace />  
    }
      
     
} 

export default RequireAuth;