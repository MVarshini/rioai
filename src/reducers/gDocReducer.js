export const initialState1 = {
  gDocMessage: [],
};

export const gDocMessageReducer = (state, action) => {
  switch (action.type) {
    case "SET_GDOC_MESSAGE":
      return {
        gDocMessage: [...state.gDocMessage, action.payload],
      };
    case "REMOVE_SKELETON":
      return {
        gDocMessage: state.gDocMessage.filter((m) => m.msg !== "skeleton"),
      };
    default:
      return state;
  }
};
