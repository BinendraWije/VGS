import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ThemeProvider from "../utils/ThemeContext";


const RequireAuth = () => {

    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.user ? <ThemeProvider/> : <Navigate to ="/signin" state={{ from: location }} replace />
     );
}

export default RequireAuth;