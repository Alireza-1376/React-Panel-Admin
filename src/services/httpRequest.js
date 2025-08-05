import axios from "axios";
const BASE_URL ="https://ecomadminapi.azhadev.ir/api"

export function post(url , values){
    return axios.post(`${BASE_URL}${url}`,values)
}
export function get(url,id="",header){
    return axios.get(`${BASE_URL}${url}${id ? `?parent${id}` : ""}`,{headers:header})
}