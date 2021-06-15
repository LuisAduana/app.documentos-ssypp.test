import axios from "axios";

let Api = axios.create({
  baseURL: "http://documentos.ssypp.mx:8000/api"
});

Api.defaults.withCredentials = true;

export default Api;
