import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {

    const { auth } = useAuth();
    const location = useLocation();

  
  /*  if(auth && auth.user_role && allowedRoles.includes(auth.user_role)){
          return <Outlet />    
    }else{ 
      return  <Navigate to = "/signin" state={{ from: location }} replace />  
    }*/

      if(auth.user_role && allowedRoles.includes(auth.user_role)){
        if(auth.accessToken){
          return  <Outlet />
        }else{
          return <Navigate to="/unauthorized" state={{ from: location }} replace />
        }
      }else {
        return <Navigate to="/sigin" state={{ from: location }} replace />
      } 
  
  
     
} 

export default RequireAuth;