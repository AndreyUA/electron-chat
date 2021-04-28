// Utils
import Notification from "../../utils/notifications";

// Action types
import { APP_IS_ONLINE, APP_IS_OFFLINE } from "../actions/types";

export default (store) => (next) => (action) => {
  const state = store.getState();
  // debugger;

  const { type, payload } = action;
  switch (type) {
    case APP_IS_ONLINE:
    case APP_IS_OFFLINE: {
      Notification.show({
        title: "Connection status:",
        body: payload ? "Online" : "Offline",
      });
    }
  }
  next(action);
};
