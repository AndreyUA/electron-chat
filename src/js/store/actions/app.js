import { APP_IS_ONLINE, APP_IS_OFFLINE } from "./types";

const onStatusChange = (dispatch) => () => {
  debugger;

  const isOnline = navigator.onLine;
  const action = navigator.onLine
    ? { type: APP_IS_ONLINE, payload: isOnline }
    : { type: APP_IS_OFFLINE, payload: isOnline };

  dispatch(action);
};

export const listenToConnectionChanges = () => (dispatch) => {
  const connectionHandler = onStatusChange(dispatch);

  window.addEventListener("online", connectionHandler);
  window.addEventListener("offline", connectionHandler);

  return () => {
    window.removeEventListener("online", connectionHandler);
    window.removeEventListener("offline", connectionHandler);
  };
};
