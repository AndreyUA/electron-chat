// Action types
import { SETTINGS_UPDATE } from "./types";

export const updateSettings = (settings, value) => {
  return {
    type: SETTINGS_UPDATE,
    payload: {
      settings,
      value,
    },
  };
};
