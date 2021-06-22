import { combineReducers } from "redux";

// Action types
import { APP_IS_OFFLINE, APP_IS_ONLINE } from "../actions/types";

const createAppReducer = () => {
  const { onLine } = navigator;

  const isOnline = (state = onLine, action) => {
    const { type, payload } = action;
    switch (type) {
      case APP_IS_ONLINE:
      case APP_IS_OFFLINE:
        return payload;
      default: {
        return state;
      }
    }
  };

  return combineReducers({
    isOnline,
  });
};

export default createAppReducer();
