import axios from "axios";
import i18n from "../i18next";


const axiosInstance = axios.create({
    baseURL: 'https://knowledgeshop.runasp.net/api',
    headers: { "Accept-Language": i18n.language }
    
    
});

axiosInstance.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = 'en';

  return config;
});
export default axiosInstance;
