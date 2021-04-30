// Action types
import { SETTINGS_UPDATE } from "../actions/types";

const initialState = {
  isDarkTheme: true,
  playSound: true,
  showNotifications: true,
};

export const settingsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SETTINGS_UPDATE:
      return {
        ...state,
        [payload.settings]: payload.value,
      };
    default:
      return state;
  }
};
