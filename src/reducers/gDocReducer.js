export const initialState1 = {
  gDocMessage: [],
};

export const gDocMessageReducer = (state, action) => {
  switch (action.type) {
    case "SET_GDOC_MESSAGE":
      return {
        gDocMessage: [...state.gDocMessage, action.payload],
      };
    default:
      return state;
  }
};
