import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxThunk from "redux-thunk";

// Reducers
import chatReducer from "./reducers/chats";
import authReducer from "./reducers/auth";
import appReducer from "./reducers/app";
import { settingsReducer } from "./reducers/settings";

// Middlewares
import appMiddleware from "./middlewares/app";
import { AUTH_LOGOUT_SUCCESS } from "./actions/types";

export default function configueStore() {
  const middlewares = [reduxThunk, appMiddleware];

  const mainReducer = combineReducers({
    chats: chatReducer,
    auth: authReducer,
    app: appReducer,
    settings: settingsReducer,
  });

  const rootReducer = (state, action) => {
    const { type } = action;
    if (type === AUTH_LOGOUT_SUCCESS) {
      Object.keys(state).forEach((key) => {
        if (state[key].savable) return;

        state[key] = undefined;
      });
      state = undefined;
    }

    return mainReducer(state, action);
  };

  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  return store;
}
