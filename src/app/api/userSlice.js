import axios from "axios";
import { AddObj, deleteObj, failRequest, getObj, getObjList, makeRequest, updateObj } from "../redux/actions";
import api from "./apiSlice";

export const fetchUserList = () => {
    return (dispatch) => {
        dispatch(makeRequest());
        api.get("users?limit=5").then(res => {
            const userlist = res.data;
            dispatch(getObjList(userlist))
        }).catch(err => {
            dispatch(failRequest(err.message))
        })
    }
}

export const removeUser = (code) => {
    return (dispatch) => {
        dispatch(makeRequest())
        axios.delete(`http://localhost:8000/users/${code}`).then(res => {
            dispatch(deleteObj())
        });
    };
};

export const FunctionAddUser = (data) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.post('http://localhost:8000/users', data).then(res => {
            dispatch(AddObj());
        }).catch(err => {
            dispatch(failRequest(err.message))
        })
    }
}


export const FunctionUpdateUser = (data, code) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.put('http://localhost:8000/users/' + code, data).then(res => {
            dispatch(updateObj());
        }).catch(err => {
            dispatch(failRequest(err.message))
        })
    }
}

export const FetchUserObj = (code) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.get("http://localhost:8000/users/" + code).then(res => {
            const data = res.data;
            dispatch(getObj(data))
        }).catch(err => {
            dispatch(failRequest(err.message))
        })
    }
}