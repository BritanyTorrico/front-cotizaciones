import axios from "axios"

const instance = axios.create({
  baseUrl:"http://localhost:4000/",
  headers:{"Content-Type":"application/json"},
});

export default instance;