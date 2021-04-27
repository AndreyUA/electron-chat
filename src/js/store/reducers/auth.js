import {
  AUTH_ON_INIT,
  AUTH_ON_SUCCESS,
  AUTH_ON_ERROR,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGIN_INIT,
  AUTH_REGISTER_INIT,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER_SUCCESS,
} from "../actions/types";

const initialState = {
  user: null,
  isChecking: false,
};

export default function authReducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case AUTH_LOGIN_INIT:
    case AUTH_REGISTER_INIT:
      return {
        ...state,
        isChecking: true,
      };
    case AUTH_LOGIN_SUCCESS:
    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        isChecking: false,
      };
    case AUTH_ON_INIT:
      return {
        ...state,
        isChecking: true,
      };
    case AUTH_ON_SUCCESS:
      return {
        ...state,
        user: payload,
        isChecking: false,
      };
    case AUTH_ON_ERROR:
      return {
        ...state,
        isChecking: false,
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isChecking: false,
      };
    default:
      return state;
  }
}
