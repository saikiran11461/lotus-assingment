import axios from "axios"
import  * as types from "./actionTypes"
import { LoginPayload, RegisterPayload } from "./types"
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export const postRegister = (payload: RegisterPayload) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch({ type: types.REGISTER_REQUEST });
  return axios.post('http://localhost:2345/api/users/register', payload)
      .then(res => {
       return dispatch({ type: types.REGISTER_SUCCESS, payload: res.data });
         
      })
      .catch(err => {
        return  dispatch({ type: types.REGISTER_FAILURE, payload: err });
         
      });
};

export const postLogin = (payload: LoginPayload) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch({ type: types.LOGIN_REQUEST });
  return axios.post('http://localhost:2345/api/users/login', payload)
      .then(res => {
        return  dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
          
      })
      .catch(err => {
       return   dispatch({ type: types.LOGIN_FAILURE, payload: err});
         
      });
};
