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

const BaseApi = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1/"
})

export const BaseApiAccount = axios.create({
    baseURL: "http://localhost:5089/API-Overtimes/Account/"
})

export default { BaseApi, api };