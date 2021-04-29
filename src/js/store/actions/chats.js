// API
import * as api from "../../api/chats";

// DataBase
import db from "../../db/firestore";

// Action types
import {
  CHATS_FETCH_SUCCESS,
  CHAT_CREATE_SUCCESS,
  CHATS_FETCH_INIT,
  CHAT_JOIN_SUCCESS,
  CHATS_SET_ACTIVE_CHAT,
} from "./types";

export const fetchChats = () => async (dispatch, getState) => {
  const {
    user: { uid },
  } = getState().auth;

  dispatch({
    type: CHATS_FETCH_INIT,
  });
  const chats = await api.fetchChats();

  chats.forEach(
    (chat) => (chat.joinedUser = chat.joinedUser.map((user) => user.id))
  );

  const sortedChats = chats.reduce(
    (accuChats, chat) => {
      accuChats[chat.joinedUser.includes(uid) ? "joined" : "available"].push(
        chat
      );
      return accuChats;
    },
    { joined: [], available: [] }
  );

  dispatch({
    type: CHATS_FETCH_SUCCESS,
    payload: { ...sortedChats },
  });

  return sortedChats;
};

export const joinChat = (chat, userId) => (dispatch) =>
  api.joinChat(userId, chat.id).then(() => {
    dispatch({ type: CHAT_JOIN_SUCCESS, payload: chat });
  });

export const createChat = (formData, userId) => async (dispatch) => {
  const newChat = { ...formData };
  newChat.admin = db.doc(`profiles/${userId}`);

  const chatId = await api.createChat(newChat);

  dispatch({ type: CHAT_CREATE_SUCCESS });

  await api.joinChat(userId, chatId);

  dispatch({ type: CHAT_JOIN_SUCCESS, payload: { ...newChat, id: chatId } });

  return chatId;
};

export const subscribeToChat = (chatId) => (dispatch) =>
  api.subscribeToChat(chatId, async (chat) => {
    const joinedUsers = await Promise.all(
      chat.joinedUser.map(async (userRef) => {
        const userSnapshot = await userRef.get();

        return userSnapshot.data();
      })
    );
    chat.joinedUser = joinedUsers;

    dispatch({ type: CHATS_SET_ACTIVE_CHAT, payload: chat });
  });
