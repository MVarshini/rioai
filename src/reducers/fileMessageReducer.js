export const initialState = {
  fileMessage: [
    {
      position: "right_bubble",
      msg: "Welome to RIOAI chat!",
    },
  ],
};

export const fileMessageReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILE_MESSAGE":
      return {
        fileMessage: [...state.fileMessage, action.payload],
      };
    case "REMOVE_SKELETON":
      return {
        fileMessage: state.fileMessage.filter((m) => m.msg !== "skeleton"),
      };
    default:
      return state;
  }
};
