import  axios  from "axios";

const BaseApi = axios.create({
    baseURL:"https://api.escuelajs.co/api/v1/"
})

export const BaseApiAccount = axios.create({
    baseURL:"http://localhost:5089/API-Overtimes/Account/"
})

export default BaseApi;