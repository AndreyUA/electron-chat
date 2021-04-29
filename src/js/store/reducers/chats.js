import { combineReducers } from "redux";

// Action types
import { CHATS_FETCH_RESTART, CHATS_FETCH_SUCCESS } from "../actions/types";

const createChatReducer = () => {
  const joined = (state = [], action) => {
    const { payload, type } = action;

    switch (type) {
      case CHATS_FETCH_RESTART:
        return [];
      case CHATS_FETCH_SUCCESS:
        return payload.joined;
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
