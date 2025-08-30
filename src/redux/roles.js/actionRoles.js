import { get } from "../../services/httpRequest";
import { ERROR, REQUEST, RESPONSE } from "./typeRoles";
const token = JSON.parse(localStorage.getItem('token'));

export function sendRequest(){
    return {
        type : REQUEST
    }
}
export function reciveReponse(data){
    return {
        type : RESPONSE ,
        payload : data 
    }
}
export function reciveError(data){
    return {
        type : ERROR ,
        payload : data
    }
}

// const getRolesDataRedux = ()=>{
//     return async(dispatch)=>{
//         dispatch(sendRequest())
//         try {
//             const response =await get("/auth/user", "" ,{Authorization : `Bearer ${token}`})
//             dispatch(reciveReponse(response.data))
//         } catch (error) {
//             dispatch(reciveError(error.response.data.message))
//         }
//     }
// }
// export default getRolesDataRedux ;