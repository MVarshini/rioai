// @ts-nocheck
import "./App.css";

import {
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import {
  fileMessageReducer,
  initialState,
} from "./reducers/fileMessageReducer";
import { useReducer, useState } from "react";

import API from "./axiosInstance";
import ChatIcon from "@mui/icons-material/Chat";
import FileGPT from "./FileInput";
import GoogleIcon from "@mui/icons-material/Google";
import InputIcon from "@mui/icons-material/Input";
import Messages from "./Messages";
import SendIcon from "@mui/icons-material/Send";
import TabPanel from "./TabPanel";

function App() {
  const [value, setValue] = useState(0);
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(fileMessageReducer, initialState);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fileQuery = async () => {
    const response = await API.get("/fileGPT", {
      params: {
        query: name,
      },
    });
    if (response.data.ok === "ok") {
      console.log("hey");
      dispatch({
        type: "SET_FILE_MESSAGE",
        payload: { position: "left_bubble", msg: response.data.response },
      });
    }
  };
  const sendQuery = () => {
    if (value === 0) {
      fileQuery();
    }
  };
  return (
    <>
      <Container maxWidth="lg">
        <Box className="box-class">
          <Card variant="outlined" className="card-wrapper">
            <CardContent>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="icon tabs example"
              >
                <Tab icon={<InputIcon />} aria-label="inputFile" />

                <Tab icon={<ChatIcon />} aria-label="chatbox" />
                <Tab icon={<GoogleIcon />} aria-label="googleDoc" />
              </Tabs>
            </CardContent>
            <TabPanel value={value} index={0}>
              <FileGPT />
              <Messages messages={state.fileMessage} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              test2
            </TabPanel>
          </Card>
          <Box className="chat-box">
            <div className="wrapper">
              <TextField
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                id="outlined-multiline-flexible"
                label="Type your query"
                multiline
                maxRows={4}
              />
              <IconButton aria-label="send" onClick={sendQuery}>
                <SendIcon />
              </IconButton>
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
