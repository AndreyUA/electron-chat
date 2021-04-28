import * as api from "../../api/auth";
import {
  AUTH_ON_INIT,
  AUTH_ON_SUCCESS,
  AUTH_ON_ERROR,
  AUTH_LOGOUT_SUCCESS,
  AUTH_REGISTER_INIT,
  AUTH_LOGIN_INIT,
  AUTH_REGISTER_ERROR,
  AUTH_LOGIN_ERROR,
  AUTH_REGISTER_SUCCESS,
  AUTH_LOGIN_SUCCESS,
} from "./types";

export const register = (formData) => (dispatch) => {
  dispatch({ type: AUTH_REGISTER_INIT });

  api
    .register(formData)
    .then((user) => dispatch({ type: AUTH_REGISTER_SUCCESS, payload: user }))
    .catch((error) => dispatch({ type: AUTH_REGISTER_ERROR, payload: error }));
};

export const loginUser = (formData) => (dispatch) => {
  dispatch({ type: AUTH_LOGIN_INIT });

  api
    .login(formData)
    .then((user) => dispatch({ type: AUTH_LOGIN_SUCCESS, payload: user }))
    .catch((error) => dispatch({ type: AUTH_LOGIN_ERROR, payload: error }));
};

export const logout = () => (dispatch) => {
  api.logout().then(() => {
    dispatch({ type: AUTH_LOGOUT_SUCCESS });
  });
};

export const listenToAuthChanges = () => (dispatch) => {
  dispatch({ type: AUTH_ON_INIT });

  api.onAuthStateChanges(async (authUser) => {
    if (authUser) {
      const userProfile = await api.getUserProfile(authUser.uid);
      dispatch({ type: AUTH_ON_SUCCESS, payload: userProfile });
    } else {
      dispatch({ type: AUTH_ON_ERROR });
    }
  });
};
