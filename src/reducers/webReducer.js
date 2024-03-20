export const initialState3 = {
  webMessage: [
    {
      position: "right_bubble",
      msg: "Welome to WebGPT!",
    },
  ],
};

export const webMessageReducer = (state, action) => {
  switch (action.type) {
    case "SET_WEB_MESSAGE":
      return {
        webMessage: [...state.webMessage, action.payload],
      };
    case "REMOVE_SKELETON":
      return {
        webMessage: state.webMessage.filter((m) => m.msg !== "skeleton"),
      };
    default:
      return state;
  }
};
