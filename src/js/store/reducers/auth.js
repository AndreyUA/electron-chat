import { combineReducers } from "redux";

// Constants
import {
  AUTH_ON_INIT,
  AUTH_ON_SUCCESS,
  AUTH_ON_ERROR,
  AUTH_LOGOUT_SUCCESS,
  AUTH_REGISTER_SUCCESS,
  AUTH_LOGIN_SUCCESS,
} from "../actions/types";

// Reducer function
import { createErrorReducer, createIsFetchingReducer } from "./common";

const createAuthReducer = () => {
  const createLoginReducer = () =>
    combineReducers({
      error: createErrorReducer("LOGIN"),
      isChecking: createIsFetchingReducer("LOGIN"),
    });

  const createRegisterReducer = () =>
    combineReducers({
      error: createErrorReducer("REGISTER"),
      isChecking: createIsFetchingReducer("REGISTER"),
    });

  const user = (state = null, action) => {
    const { payload, type } = action;

    switch (type) {
      case AUTH_ON_ERROR:
      case AUTH_ON_INIT:
      case AUTH_LOGOUT_SUCCESS:
        return null;
      case AUTH_ON_SUCCESS:
      case AUTH_REGISTER_SUCCESS:
      case AUTH_LOGIN_SUCCESS:
        return payload;
      default:
        return state;
    }
  };

  return combineReducers({
    user,
    isChecking: createIsFetchingReducer("ON"),
    login: createLoginReducer(),
    register: createRegisterReducer(),
  });
};

export default createAuthReducer();
