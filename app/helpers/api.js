import axios from "axios";

export const authAPI = axios.create({
  baseURL: "https://reqres.in/",
});

export const feedAPI = axios.create({
  baseURL: "https://picsum.photos/",
});
