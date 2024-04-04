import { ADD_OBJECT, DELETE_OBJECT, FAIL_REQUEST, GET_LIST_OBJECT, GET_OBJECT, MAKE_REQUEST, UPDATE_OBJECT } from "./actions"

const initiateState = {
    loading: true,
    objlist: [],
    itemobj:{},
    errmessage:''
}

export const Reducer = (state = initiateState, action) => {
    switch(action.type){
        case MAKE_REQUEST:
            return{
                ...state,
                loading: true
            }
        case FAIL_REQUEST:
            return {
                ...state,
                loading:false,
                errmessage:action.payload
            }
        case GET_LIST_OBJECT:
            return {
                ...state,
                loading: false,
                errmessage:'',
                objlist: action.payload,
                itemobj:{}
            }
        case DELETE_OBJECT:
            return{
                ...state,
                loading:false,                
            }
        case ADD_OBJECT:
            return{
                ...state,
                loading:false,                
            }
        case UPDATE_OBJECT:
            return{
                ...state,
                loading:false,                
            }
        case GET_OBJECT:
            return{
                ...state,
                loading:false,
                userobj:action.payload                
            }
        default :
            return state 
    }
}



