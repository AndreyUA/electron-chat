import { AUTH_ON_INIT, AUTH_ON_SUCCESS, AUTH_ON_ERROR } from "../actions/types";

const initialState = {
  user: null,
  isChecking: false,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTH_ON_INIT:
      return {
        ...state,
        isChecking: true,
      };
    case AUTH_ON_SUCCESS:
      return {
        user: payload,
        isChecking: false,
      };
    case AUTH_ON_ERROR:
      return {
        ...state,
        isChecking: false,
      };
    default:
      return {
        state,
      };
  }
}
