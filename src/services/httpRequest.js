import axios from "axios";
const BASE_URL ="https://ecomadminapi.azhadev.ir/api"

export function post(url , values){
    return axios.post(`${BASE_URL}${url}`,values)
}
export function get(url , header){
    return axios.get(`${BASE_URL}${url}`,header)
}