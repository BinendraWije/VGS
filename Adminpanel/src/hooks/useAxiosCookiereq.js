
import { axiosCookie } from "../utils/axios";

const useAxiosCookiereq = () => {
  
  const axiosCookie = axiosCookie.interceptors.request.use(
    (config) => {
      config.withCredentials = true
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

return axiosCookie;
}

export default useAxiosCookiereq;