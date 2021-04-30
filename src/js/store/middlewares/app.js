// Utils
import Notification from "../../utils/notifications";

// Action types
import {
  APP_IS_ONLINE,
  APP_IS_OFFLINE,
  AUTH_LOGOUT_SUCCESS,
  SETTINGS_UPDATE,
} from "../actions/types";

export default (store) => (next) => (action) => {
  const { type, payload } = action;
  switch (type) {
    case APP_IS_ONLINE:
    case APP_IS_OFFLINE: {
      Notification.show({
        title: "Connection status:",
        body: payload ? "Online" : "Offline",
      });
    }

    case SETTINGS_UPDATE: {
      const currentSettings = localStorage.getItem("app-settings");
      const parsedCurrentSettings = currentSettings
        ? JSON.parse(currentSettings)
        : {};

      const newSettings = {
        ...parsedCurrentSettings,
        [payload.settings]: payload.value,
      };

      localStorage.setItem("app-settings", JSON.stringify(newSettings));
    }

    case AUTH_LOGOUT_SUCCESS: {
      const { messagesSubs } = store.getState().chats;

      if (messagesSubs) {
        Object.keys(messagesSubs).forEach((messageSub) =>
          messagesSubs[messageSub]()
        );
      }
    }
  }

  next(action);
};
