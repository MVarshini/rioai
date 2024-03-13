export const initialState = {
  fileMessage: [
    {
      position: "left_bubble",
      msg: "Hey",
    },
    {
      position: "right_bubble",
      msg: "Welome to our chat",
    },
  ],
};

export const fileMessageReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILE_MESSAGE":
      return {
        fileMessage: [...state.fileMessage, action.payload],
      };
    default:
      return state;
  }
};
