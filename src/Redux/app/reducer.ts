import * as types from "./actionTypes";

const init = {
  todo: [],
  isLoading: false,
  isError: false,
};

export const reducer = (oldState = init, acton:any) => {
  const { type, payload } = acton;

  switch (type) {
    case types.GET_TODO_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isErrored: false,
      };
    case types.GET_TODO_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        todo: payload,
      };
    case types.GET_TODO_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
      };
    case types.POST_TODO_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isErrored: false,
      };
    case types.POST_TODO_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
      };
    case types.POST_TODO_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
      };
    case types.PATCH_TODO_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isErrored: false,
      };
    case types.PATCH_TODO_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
      };
    case types.PATCH_TODO_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
      };
    case types.DELETE_TODO_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isErrored: false,
      };
    case types.DELETE_TODO_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
      };
    case types.DELETE_TODO_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
      };
    default:
      return oldState;
  }
};
