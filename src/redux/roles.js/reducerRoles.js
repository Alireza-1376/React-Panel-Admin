import { ERROR, REQUEST, RESPONSE } from "./typeRoles"

const initialState = {
    loading :false ,
    roles : [] ,
    error : "" ,
}



const rolesReducer =(state = initialState , action)=>{
    switch(action.type){
        case REQUEST : return {loading : true , roles : [] , error : ""} ;
        case RESPONSE : return {loading : false , roles : action.payload , error : ""} ;
        case ERROR : return {loading : false , roles : [] , error : action.payload} ;
        default : return state ;
    }
}

export default rolesReducer; 