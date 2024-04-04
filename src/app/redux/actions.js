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

export const getUserList = (data) => {
    return {
        type: GET_LIST_OBJECT,
        payload:data
    }
}

export const deleteUser = () =>{
    return {
        type: DELETE_OBJECT        
    }
}

export const AddUser = () =>{
    return {
        type: ADD_OBJECT
    }
}

export const updateUser = () =>{
    return {
        type: UPDATE_OBJECT
    }
}

export const getUserObj = (data) =>{
    return {
        type: GET_OBJECT,
        payload:data
    }
}
