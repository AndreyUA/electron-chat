import * as api from "../../api/auth";
import {
  AUTH_REGISTER_SUCCESS,
  AUTH_ON_INIT,
  AUTH_ON_SUCCESS,
  AUTH_ON_ERROR,
} from "./types";

export const register = (formData) => async (dispatch) => {
  await api.register(formData);

  dispatch({
    type: AUTH_REGISTER_SUCCESS,
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
