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
    return (
      auth?.user_role?.allowedRoles?.includes(auth.user_role)
          ? <Outlet />
          : auth?.accessToken //changed from user to accessToken to persist login after refresh
              ? <Navigate to="/unauthorized" state={{ from: location }} replace />
              : <Navigate to="/login" state={{ from: location }} replace />
  );
   
     
} 

export default RequireAuth;