import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

export default function configueStore() {
  const middlewares = [reduxThunk];
  const store = createStore(() => {
    return {
      message: "hello world",
      data1: "test",
      data2: "test",
    };
  }, applyMiddleware(...middlewares));

  return store;
}
