// API
import * as api from "../../api/connection";

// Action types
import { CONNECTION_USER_STATUS_CHANGED } from "./types";

export const checkUserConnection = () => (dispatch) =>
  api.onConnectionChanged((isConnected) => {
    debugger;
    console.log(isConnected);
    dispatch({ type: CONNECTION_USER_STATUS_CHANGED });
  });
