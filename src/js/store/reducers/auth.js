import { combineReducers } from "redux";

// Constants
import {
  AUTH_ON_INIT,
  AUTH_ON_SUCCESS,
  AUTH_ON_ERROR,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGIN_INIT,
  AUTH_REGISTER_INIT,
  AUTH_LOGIN_ERROR,
  AUTH_REGISTER_ERROR,
} from "../actions/types";

const createAuthReducer = () => {
  const createLoginReducer = () => {
    const error = (state = null, action) => {
      const { payload, type } = action;

      switch (type) {
        case AUTH_LOGIN_INIT:
          return null;
        case AUTH_LOGIN_ERROR:
          return payload;
        default:
          return state;
      }
    };

    return combineReducers({
      error,
    });
  };

  const createRegisterReducer = () => {
    const error = (state = null, action) => {
      const { payload, type } = action;

      switch (type) {
        case AUTH_REGISTER_INIT:
          return null;
        case AUTH_REGISTER_ERROR:
          return payload;
        default:
          return state;
      }
    };

    return combineReducers({
      error,
    });
  };

  const user = (state = null, action) => {
    const { payload, type } = action;

    switch (type) {
      case AUTH_ON_ERROR:
      case AUTH_ON_INIT:
      case AUTH_LOGOUT_SUCCESS:
        return null;
      case AUTH_ON_SUCCESS:
        return payload;
      default:
        return state;
    }
  };

  const isChecking = (state = false, action) => {
    const { type } = action;

    switch (type) {
      case AUTH_LOGIN_INIT:
      case AUTH_REGISTER_INIT:
      case AUTH_ON_INIT:
        return true;
      case AUTH_ON_SUCCESS:
      case AUTH_ON_ERROR:
      case AUTH_LOGOUT_SUCCESS:
      case AUTH_LOGIN_ERROR:
      case AUTH_REGISTER_ERROR:
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    user,
    isChecking,
    login: createLoginReducer(),
    register: createRegisterReducer(),
  });
};

export default createAuthReducer();
