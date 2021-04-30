// Action types
import { SETTINGS_UPDATE, SETTINGS_INITIAL_LOAD } from "./types";

export const updateSettings = (settings, value) => ({
  type: SETTINGS_UPDATE,
  payload: {
    settings,
    value,
  },
});

export const loadInitialSettings = () => ({
  type: SETTINGS_INITIAL_LOAD,
});
