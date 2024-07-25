import * as types from "./actionTypes";

const init = {
  auth:localStorage.getItem("token")? true : false,
  token:"",
  isLoading: false,
  isError: false,
};

export const reducer = (oldState = init, acton:any) => {
  const { type, payload } = acton;

  switch (type) {
   case types.REGISTER_REQUEST:
    return{
        ...oldState,
        isLoading: true,
        isError: false
    }
case types.REGISTER_SUCCESS:
    return{
        ...oldState,
        isLoading:false,
        isError:false,
        auth:true,
        token:payload
    }
case types.REGISTER_FAILURE:
    return{
        ...oldState,
        isLoading:false,
        isError:true
    }
    default:
      return oldState;
  }
};
