import { APP_IS_ONLINE, APP_IS_OFFLINE } from "../actions/types";

export default (store) => (next) => (action) => {
  const state = store.getState();
  debugger;
  const { type } = action;
  switch (type) {
    case APP_IS_ONLINE:
    case APP_IS_OFFLINE: {
      alert("Displaying notification");
    }
  }
  next(action);
};
