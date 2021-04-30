// Action types
import { SETTINGS_INITIAL_LOAD, SETTINGS_UPDATE } from "../actions/types";

// Utils
import Storage from "../../utils/storage";

const initialState = {
  isDarkTheme: true,
  playSound: true,
  showNotifications: true,
  savable: true,
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
      const storedSettings = Storage.getItem("app-settings");
      return {
        ...state,
        ...storedSettings,
      };
    default:
      return state;
  }
};
