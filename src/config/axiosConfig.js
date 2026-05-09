import { store } from "../store/index";
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const api = axios.create({
  baseURL: serverUrl,
});

export const authApi = axios.create({
  baseURL: serverUrl,
});

authApi.interceptors.request.use(
  (request) => {
    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);

api.interceptors.request.use(
  (config) => {
    let authToken = store?.getState()?.user?.user?.token;
    config.headers = {
      Authorization: `Bearer ${authToken}`,
      Accept: "application/json",
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);
