import axios from "axios";

const api = axios.create({
  // baseURL: "http://103.84.207.239:8090/api",
  // baseURL: "http://id3.labkom.us:4148/api",
  baseURL: "http://103.127.96.198:8000/api",
});

export default api;
