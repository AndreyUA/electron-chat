import * as api from "../../api/auth";

export const register = (formData) => async (dispatch) => {
  const response = await api.register(formData);

  debugger;
  dispatch({
    type: "AUTH_REGISTER_SUCCESS",
  });
  return response;
};
