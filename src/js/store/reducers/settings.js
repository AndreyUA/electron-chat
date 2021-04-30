// Action types
import { SETTINGS_INITIAL_LOAD, SETTINGS_UPDATE } from "../actions/types";

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
    case SETTINGS_INITIAL_LOAD:
      const storedSettings = localStorage.getItem("app-settings");
      const settings = storedSettings
        ? JSON.parse(storedSettings)
        : initialState;
      return {
        ...state,
        ...settings,
      };
    default:
      return state;
  }
};
