import * as api from "../../api/auth";
import {
  AUTH_REGISTER_SUCCESS,
  AUTH_ON_INIT,
  AUTH_ON_SUCCESS,
  AUTH_ON_ERROR,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER_INIT,
  AUTH_LOGIN_INIT,
} from "./types";

export const register = (formData) => (dispatch) => {
  dispatch({ type: AUTH_REGISTER_INIT });

  api.register(formData).then(() => {
    dispatch({
      type: AUTH_REGISTER_SUCCESS,
    });
  });
};

export const loginUser = (formData) => (dispatch) => {
  dispatch({ type: AUTH_LOGIN_INIT });

  api.login(formData).then(() => {
    dispatch({ type: AUTH_LOGIN_SUCCESS });
  });
};

export const logout = () => (dispatch) => {
  api.logout().then(() => {
    dispatch({ type: AUTH_LOGOUT_SUCCESS });
  });
};

export const listenToAuthChanges = () => (dispatch) => {
  dispatch({ type: AUTH_ON_INIT });

  api.onAuthStateChanges((authUser) => {
    if (authUser) {
      dispatch({ type: AUTH_ON_SUCCESS, payload: authUser });
    } else {
      dispatch({ type: AUTH_ON_ERROR });
    }
  });
};
