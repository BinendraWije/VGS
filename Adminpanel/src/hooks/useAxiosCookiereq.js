
import { axiosCookie } from "../utils/axios";

const useAxiosCookiereq = () => {
  
  const axioscookie = axiosCookie.interceptors.request.use(
    (config) => {
      config.withCredentials = true
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

return axioscookie;
}

export default useAxiosCookiereq;