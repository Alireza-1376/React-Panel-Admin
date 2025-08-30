import { ERROR, REQUEST, RESPONSE } from "./typeUsers"

const initialState = {
    loading :false ,
    user : [] ,
    error : "" ,
}



const usersReducer =(state = initialState , action)=>{
    switch(action.type){
        case REQUEST : return {loading : true , user : [] , error : ""} ;
        case RESPONSE : return {loading : false , user : action.payload , error : ""} ;
        case ERROR : return {loading : false , user : [] , error : action.payload} ;
        default : return state ;
    }
}

export default usersReducer; 