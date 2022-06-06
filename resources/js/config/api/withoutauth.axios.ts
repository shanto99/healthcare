import axios from "axios-observable";
import CONFIG from "./intex";

const AxiosWithOutAuthInstance = axios.create({
  baseURL: CONFIG.BASE_URL,
  timeout: 24000,
});

AxiosWithOutAuthInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default AxiosWithOutAuthInstance;