import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:4000/",
//    baseURL: "https://api-cotizaciones.herokuapp.com/",
    headers: { "Content-Type": "application/json" },
});

export default instance;