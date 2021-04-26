import * as api from "../../api/auth";
import {
  AUTH_REGISTER_SUCCESS,
  AUTH_ON_INIT,
  AUTH_ON_SUCCESS,
  AUTH_ON_ERROR,
  AUTH_LOGOUT_SUCCESS,
} from "./types";

export const register = (formData) => async (dispatch) => {
  await api.register(formData);

  dispatch({
    type: AUTH_REGISTER_SUCCESS,
  });
};

export const logout = () => (dispatch) => {
  api.logout();

  dispatch({ type: AUTH_LOGOUT_SUCCESS });
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
