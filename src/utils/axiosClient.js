import store from "../redux/store";
import { setLoading, showToast } from "../redux/slices/appConfigSlice";
import { TOAST_FAILURE } from "../App";

import axios from "axios";
import {
  getItem,
  KEY_ACCESS_TOKEN,
  removeItem,
  setItem,
} from "./localStorageManager";

export const axiosClient = axios.create({
  baseURL:process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
  store.dispatch(setLoading(true));
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  //sending accessToken for each api request
  request.headers["Authorization"] = `Bearer ${accessToken}`;

  return request;
});

axiosClient.interceptors.response.use(
  async (response) => {
    store.dispatch(setLoading(false));
    
    const data = response.data;
    if (data.status === "ok") {
      return data;
    }

    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const error = data.message;

    store.dispatch(
      showToast({
        type: TOAST_FAILURE,
        message: error,
      })
    );

    // if we get error from refresh route ... means that refresh key is expired then we will send user
    // back to login page after reloading the website
    if (
      statusCode === 401 &&
      originalRequest.url ===
        `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`
    ) {
      removeItem(KEY_ACCESS_TOKEN);
      window.location.replace("/login", "_self");
      return Promise.reject(error);
    }

    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await axiosClient.get("/auth/refresh");

      if (response.status === "ok") {
        //means that access token is expired
        setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.result.accessToken}`;

        return axios(originalRequest);
      } else {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
  async (error) => {
    store.dispatch(setLoading(false));
    store.dispatch(
      showToast({
        type: TOAST_FAILURE,
        message: error,
      })
    );
    return Promise.reject(error);
  }
);
