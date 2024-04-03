import axios from "axios";
import { AddUser, deleteUser, failRequest, getUserList, getUserObj, makeRequest, updateUser } from "../redux/Action";
import BaseApi from "./Api";


export const fetchUserList = () => {
    return (dispatch) => {
        dispatch(makeRequest());
        BaseApi.get("users?limit=5").then(res =>{
            const userlist = res.data;
            dispatch(getUserList(userlist))
        }).catch(err=>{
            dispatch(failRequest(err.message))
        })        
    }
}


export const Removeuser = (code) => {
    return (dispatch) => {
        dispatch(makeRequest())
        axios.delete(`http://localhost:8000/users/${code}`).then(res =>{
        dispatch(deleteUser())
        }).catch(error=>{
            //dispatch(failRequest(err.message))
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
              console.log(error.config);
        })        
    }
}

export const FunctionAddUser = (data) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.post('http://localhost:8000/users', data).then(res =>{
            dispatch(AddUser());
        }).catch(err=>{
            dispatch(failRequest(err.message))
        })        
    }
}


export const FunctionUpdateUser = (data, code) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.put('http://localhost:8000/users/'+code,data).then(res =>{
            dispatch(updateUser());
        }).catch(err=>{
            dispatch(failRequest(err.message))
        })        
    }
}

export const FetchUserObj = (code) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.get("http://localhost:8000/users/"+code).then(res =>{
            const data = res.data;
            dispatch(getUserObj(data))
        }).catch(err=>{
            dispatch(failRequest(err.message))
        })        
    }
}