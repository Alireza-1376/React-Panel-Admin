import axios from "axios";
const BASE_URL ="https://ecomadminapi.azhadev.ir/api";


export function post(url , values,header){
    return axios.post(`${BASE_URL}${url}`,values,{headers:header})
}
export function get(url,id,header){
    return axios.get(`${BASE_URL}${url}${id?`?parent=${id}`:""}`,{headers:header})
}

export function put(url,values,header){
    return axios.put(`${BASE_URL}${url}`,values,{headers:header})
}

export function Delete(url ,header){
    return axios.delete(`${BASE_URL}${url}`,{headers:header})
}