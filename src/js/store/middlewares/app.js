// Utils
import Notification from "../../utils/notifications";
import Storage from "../../utils/storage";

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
      const { showNotifications } = store.getState().settings;

      if (showNotifications) {
        Notification.show({
          title: "Connection status:",
          body: payload ? "Online" : "Offline",
        });
      }
    }

    case SETTINGS_UPDATE: {
      const currentSettings = Storage.getItem("app-settings");

      const newSettings = {
        ...currentSettings,
        [payload.settings]: payload.value,
      };

      Storage.setItem("app-settings", newSettings);
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
