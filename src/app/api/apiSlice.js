import axios from "axios";

let urls = {
    development: "https://api.escuelajs.co/api/v1",
    production: "",
};

const api = axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;