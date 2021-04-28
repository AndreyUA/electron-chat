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

export const createChat = (formData, userId) => async (dispatch) => {
  const newChat = { ...formData };
  newChat.admin = db.doc(`profiles/${userId}`);

  const chatId = await api.createChat(newChat);

  dispatch({ type: CHAT_CREATE_SUCCESS });

  await api.joinChat(userId, chatId);

  // TODO: implement this action type
  dispatch({ type: "CHAT_JOIN_SUCCESS" });

  return chatId;
};
