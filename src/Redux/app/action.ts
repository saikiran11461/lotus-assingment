import axios from "axios";
import * as types from "./actionTypes";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { EditTodoPayload, TodoPayload } from "./types";

const token =  localStorage.getItem("token");

export const getTodo = ()=>(dispatch:ThunkDispatch<{}, {}, AnyAction>)=>{
    dispatch({type:types.GET_TODO_REQUEST})
   return axios.get("http://localhost:2345/api/todo")
    .then(res=>{
    return  dispatch({type:types.GET_TODO_SUCCESS, payload:res.data})
    })
    .catch(err=>{
    return  dispatch({type:types.GET_TODO_FAILURE, payload:err})
    })
}


export const getSingleTodo = (id:String)=>(dispatch:ThunkDispatch<{}, {}, AnyAction>)=>{
    dispatch({type:types.GET_SINGLE_TODO_REQUEST})
   return axios.get(`http://localhost:2345/api/todo/${id}`,{
    headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
   })
    .then(res=>{
    return  dispatch({type:types.GET_SINGLE_TODO_SUCCESS, payload:res.data})
    })
    .catch(err=>{
    return  dispatch({type:types.GET_SINGLE_TODO_FAILURE, payload:err})
    })
}



export const postTodo = (payload:TodoPayload)=>(dispatch:ThunkDispatch<{}, {}, AnyAction>)=>{
    dispatch({type:types.POST_TODO_REQUEST});
  
 return axios.post("http://localhost:2345/api/todo/addTodo", payload,{
    headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
 })
    .then(res=>{
    return dispatch({type:types.POST_TODO_SUCCESS, payload:res.data})
    })
    .catch(err=>{
  return   dispatch({type:types.POST_TODO_FAILURE, payload:err})
    })
}

export const patchTodo = (id:string,payload:EditTodoPayload)=>(dispatch:ThunkDispatch<{}, {}, AnyAction>)=>{
    dispatch({type:types.PATCH_TODO_REQUEST})
    console.log("action id", id)
   return axios.patch(`http://localhost:2345/api/todo/${id}`, payload,{
    headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
   })
    .then(res=>{
    return  dispatch({type:types.PATCH_TODO_SUCCESS, payload:res.data})
    })
    .catch(err=>{
    return  dispatch({type:types.PATCH_TODO_FAILURE, payload:err})
    })
}


export const deleteTodo = (id:String)=>(dispatch:ThunkDispatch<{}, {}, AnyAction>)=>{
    dispatch({type:types.DELETE_TODO_REQUEST})
   return axios.delete(`http://localhost:2345/api/todo/${id}`,{
    headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
   })
    .then(res=>{
     return dispatch({type:types.DELETE_TODO_SUCCESS, payload:res.data})
    })
    .catch(err=>{
    return  dispatch({type:types.DELETE_TODO_FAILURE, payload:err})
    })
}


