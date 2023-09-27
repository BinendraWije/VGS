import axios from "../utils/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
const { setAuth } = useAuth();
const refresh = async () => {
    const response = await axios.get('/refresh',{
        withCredentials: true        
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