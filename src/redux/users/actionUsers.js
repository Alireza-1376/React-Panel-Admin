
import { ERROR, REQUEST, RESPONSE } from "./typeUsers";


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

