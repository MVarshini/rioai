export const initialState2 = {
  perfMessage: [
    {
      position: "right_bubble",
      msg: "Welome to PerfGPT!",
    },
  ],
};

export const perfMessageReducer = (state, action) => {
  switch (action.type) {
    case "SET_PERF_MESSAGE":
      return {
        perfMessage: [...state.perfMessage, action.payload],
      };
    case "REMOVE_SKELETON":
      return {
        perfMessage: state.perfMessage.filter((m) => m.msg !== "skeleton"),
      };
    default:
      return state;
  }
};
