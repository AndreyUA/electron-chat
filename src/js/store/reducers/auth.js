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
  // TODO: reusable switch block
  const loginReducer = (state = { error: null }, action) => {
    const { payload, type } = action;

    switch (type) {
      case AUTH_LOGIN_INIT:
        return {
          error: null,
        };
      case AUTH_LOGIN_ERROR:
        return {
          error: payload,
        };
      default:
        return state;
    }
  };

  const registerReducer = (state = { error: null }, action) => {
    const { payload, type } = action;

    switch (type) {
      case AUTH_REGISTER_INIT:
        return {
          error: null,
        };
      case AUTH_REGISTER_ERROR:
        return {
          error: payload,
        };
      default:
        return state;
    }
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
    login: loginReducer,
    register: registerReducer,
  });
};

export default createAuthReducer();
