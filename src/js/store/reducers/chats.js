import { combineReducers } from "redux";

// Action types
import {
  CHATS_FETCH_RESTART,
  CHATS_FETCH_SUCCESS,
  CHAT_JOIN_SUCCESS,
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

  return combineReducers({
    joined,
    available,
  });
};

export default createChatReducer();
