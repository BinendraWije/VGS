
import { axiosCookie } from "../utils/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosCookiereq = () => {
  useEffect(() =>{

  const cookierequestIntercept  = axiosCookie.interceptors.request.use(
    (config) => {
      config.withCredentials = true
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  return()=>{
    axiosCookie.interceptors.request.eject(cookierequestIntercept);
  }
})
return axiosCookie;
}

export default useAxiosCookiereq;