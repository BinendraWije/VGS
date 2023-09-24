import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import App from "../App";

const RequireAuth = () => {

    const { auth } = useAuth();
    const location = useLocation();

    return(
        auth?.user ? <App /> : <Navigate to ="/signin" state={{ from: location }} replace />
     );
}

export default RequireAuth;