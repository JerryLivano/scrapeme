export const MAKE_REQUEST = 'MAKE_REQUEST'
export const FAIL_REQUEST = 'FAIL_REQUEST'
export const GET_LIST_OBJECT= 'GET_LIST_OBJECT'
export const DELETE_OBJECT= 'DELETE_OBJECT'
export const ADD_OBJECT= 'ADD_OBJECT'
export const UPDATE_OBJECT= 'UPDATE_OBJECT'
export const GET_OBJECT= 'GET_OBJECT'



export const makeRequest = () =>{
    return {
        type: MAKE_REQUEST
    }
}

export const failRequest = (err) =>{
    return {
        type: FAIL_REQUEST,
        payload: err
    }
}

export const getObjList = (data) => {
    return {
        type: GET_LIST_OBJECT,
        payload:data
    }
}

export const deleteObj = () =>{
    return {
        type: DELETE_OBJECT        
    }
}

export const AddObj = () =>{
    return {
        type: ADD_OBJECT
    }
}

export const updateObj = () =>{
    return {
        type: UPDATE_OBJECT
    }
}

export const getObj = (data) =>{
    return {
        type: GET_OBJECT,
        payload:data
    }
}
