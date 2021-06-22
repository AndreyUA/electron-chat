// API
import * as api from "../../api/connection";

// Action types
import { CONNECTION_USER_STATUS_CHANGED } from "./types";

export const checkUserConnection = (uid) => (dispatch) =>
  api.onConnectionChanged((isConnected) => {
    api.setUserOnlineStatus(uid, isConnected);
    dispatch({ type: CONNECTION_USER_STATUS_CHANGED });
  });
