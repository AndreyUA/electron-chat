import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxThunk from "redux-thunk";

// Reducers
import chatReducer from "./reducers/chats";
import authReducer from "./reducers/auth";
import appReducer from "./reducers/app";

export default function configueStore() {
  const middlewares = [reduxThunk];

  const store = createStore(
    combineReducers({
      chats: chatReducer,
      auth: authReducer,
      app: appReducer,
    }),
    applyMiddleware(...middlewares)
  );

  return store;
}
