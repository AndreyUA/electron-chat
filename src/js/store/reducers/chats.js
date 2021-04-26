const initialState = {
  items: [],
};

export default function chatReducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case "CHATS_FETCH_SUCCESS":
      return {
        items: payload,
      };
    default: {
      return state;
    }
  }
}
