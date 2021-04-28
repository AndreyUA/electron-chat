// API
import * as api from "../../api/chats";

// DataBase
import db from "../../db/firestore";

// Action types
import { CHATS_FETCH_SUCCESS, CHAT_CREATE_SUCCESS } from "./types";

export const fetchChats = () => {
  return async function (dispatch) {
    const response = await api.fetchChats();
    dispatch({
      type: CHATS_FETCH_SUCCESS,
      payload: response,
    });

    return response;
  };
};

export const createChat = (formData, userId) => (dispatch) => {
  const newChat = { ...formData };
  const userRef = db.doc(`profiles/${userId}`);
  newChat.admin = userRef;
  newChat.joinedUser = [userRef];

  return api
    .createChat(newChat)
    .then(() => dispatch({ type: CHAT_CREATE_SUCCESS }));
};
