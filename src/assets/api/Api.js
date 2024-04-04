import  axios  from "axios";

const BaseApi = axios.create({
    baseURL:"https://api.escuelajs.co/api/v1/"
})

export const BaseApiAccount = axios.create({
    baseURL:"https://api.escuelajs.co/api/v1/auth/"
})
export default BaseApi;