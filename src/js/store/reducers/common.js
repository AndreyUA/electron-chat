export const createErrorReducer = (actionType) => (state = null, action) => {
  const { payload, type } = action;

  switch (type) {
    case `AUTH_${actionType}_INIT`:
      return null;
    case `AUTH_${actionType}_ERROR`:
      return payload;
    default:
      return state;
  }
};

export const createIsFetchingReducer = (actionType) => (
  state = false,
  action
) => {
  const { type } = action;

  switch (type) {
    case `AUTH_${actionType}_INIT`:
      return true;
    case `AUTH_${actionType}_SUCCESS`:
    case `AUTH_${actionType}_ERROR`:
      return false;
    default:
      return state;
  }
};
