import { combineReducers } from "redux";

// Constants
import {
  AUTH_ON_INIT,
  AUTH_ON_SUCCESS,
  AUTH_ON_ERROR,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGIN_INIT,
  AUTH_REGISTER_INIT,
} from "../actions/types";

const createAuthReducer = () => {
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
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    user,
    isChecking,
  });
};

export default createAuthReducer();
