import axios from "axios";

const instance = axios.create({
    baseURL: "https://api-cotizaciones.herokuapp.com/",
    headers: { "Content-Type": "application/json" },
});

export default instance;