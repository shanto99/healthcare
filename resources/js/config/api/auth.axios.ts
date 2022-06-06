import axios from "axios";
import CONFIG from "./intex";
//import { logoutAction } from "../../modules/auth/redux/logout/logout.actions";
import { store } from "../redux/store";

//!FROM local storage
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};
const AxiosAuthInstance = axios.create({
  baseURL: CONFIG.BASE_URL,
  timeout: 24000,
  headers,
});

AxiosAuthInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosAuthInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      //store.dispatch(logoutAction());
    }
    return Promise.reject(error);
  }
);

export { AxiosAuthInstance };