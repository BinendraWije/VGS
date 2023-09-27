import axios from "../utils/axios"
import useAuth from "./useAuth"
import useAxiosCookiereq from "../hooks/useAxiosCookiereq";



const useRefreshToken = () => {
const { setAuth } = useAuth();
const axioscookie = useAxiosCookiereq();

const refresh = async () => {
    const response = await axioscookie.get('/refresh',{
        withCredentials:true,
        
    })
    setAuth(prev => {
        console.log("getting the previous accesstoken")
        console.log(JSON.stringify(prev));
        console.log(response.data.accessToken)
        return {...prev,
            user_role: response.data.user_role,
            accessToken:response.data.accessToken
        }
    });
    return response.data.accessToken;
 }
 return refresh;

};

export default useRefreshToken;