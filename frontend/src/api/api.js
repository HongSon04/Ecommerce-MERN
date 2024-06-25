import axios from "axios";

const local = "http://localhost:5000";
const production = "https://api.myapp.com";

const api = axios.create({
  baseURL: `${local}/api`,
});

export default api;
