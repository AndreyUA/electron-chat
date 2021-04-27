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
