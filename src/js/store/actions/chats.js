import * as api from "../../api/chats";

export function fetchChats() {
  return async function (dispatch) {
    const response = await api.fetchChats();
    dispatch({
      type: "CHATS_FETCH_SUCCESS",
      payload: response,
    });

    return response;
  };
}
