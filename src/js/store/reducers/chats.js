import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

// Action types
import {
  CHATS_FETCH_RESTART,
  CHATS_FETCH_SUCCESS,
  CHAT_JOIN_SUCCESS,
  CHATS_SET_ACTIVE_CHAT,
  CHATS_UPDATE_USER_STATE,
  CHATS_REGISTER_MESSAGE_SUB,
} from "../actions/types";

const createChatReducer = () => {
  const joined = (state = [], action) => {
    const { payload, type } = action;

    switch (type) {
      case CHATS_FETCH_RESTART:
        return [];
      case CHATS_FETCH_SUCCESS:
        return payload.joined;
      case CHAT_JOIN_SUCCESS:
        return [...state, payload];
      default:
        return state;
    }
  };

  const available = (state = [], action) => {
    const { payload, type } = action;

    switch (type) {
      case CHATS_FETCH_RESTART:
        return [];
      case CHATS_FETCH_SUCCESS:
        return payload.available;
      case CHAT_JOIN_SUCCESS:
        return state.filter((chat) => chat.id !== payload.id);
      default:
        return state;
    }
  };

  const activeChats = createReducer(
    {},
    {
      CHATS_SET_ACTIVE_CHAT: (state, action) => {
        const { payload } = action;
        state[payload.id] = payload;
      },
      CHATS_UPDATE_USER_STATE: (state, action) => {
        const {
          payload: { user, chatId },
        } = action;
        const joinedUser = state[chatId].joinedUser;
        const index = joinedUser.findIndex((jUser) => jUser.uid === user.uid);

        if (index < 0) {
          return state;
        }

        if (joinedUser[index].state === user.state) {
          return state;
        }

        joinedUser[index].state = user.state;
      },
    }
  );

  const messages = createReducer(
    {},
    {
      CHAT_SET_MESSAGES: (state, action) => {
        const {
          payload: { chatMessages, chatId },
        } = action;
        const prevMessages = state[chatId] || [];

        state[chatId] = [...prevMessages, ...chatMessages];
      },
    }
  );

  const messagesSubs = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
      case CHATS_REGISTER_MESSAGE_SUB:
        return {
          ...state,
          [payload.chatId]: payload.messageSub,
        };

      default:
        return state;
    }
  };

  return combineReducers({
    joined,
    available,
    activeChats,
    messages,
    messagesSubs,
  });
};

export default createChatReducer();
