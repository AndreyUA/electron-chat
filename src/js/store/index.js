import { createStore } from "redux";

export default function configueStore() {
  const store = createStore(() => {
    return {
      message: "hello world",
      data1: "test",
      data2: "test",
    };
  });

  return store;
}
