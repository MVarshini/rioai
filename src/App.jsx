// @ts-nocheck
import "./App.css";

import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  fileMessageReducer,
  initialState,
} from "./reducers/fileMessageReducer";
import { gDocMessageReducer, initialState1 } from "./reducers/gDocReducer";
import { useReducer, useState } from "react";

import API from "./axiosInstance";
import ChatIcon from "@mui/icons-material/Chat";
import FileGPT from "./FileInput";
import GoogleIcon from "@mui/icons-material/Google";
import InputIcon from "@mui/icons-material/Input";
import Messages from "./Messages";
import SendIcon from "@mui/icons-material/Send";
import TabPanel from "./TabPanel";
import UploadIcon from "@mui/icons-material/Upload";

function App() {
  const [value, setValue] = useState(0);
  const [name, setName] = useState("");
  const [gDocLink, setGDocLink] = useState("");
  const [state, dispatch] = useReducer(fileMessageReducer, initialState);
  const [state1, dispatch1] = useReducer(gDocMessageReducer, initialState1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fileQuery = async () => {
    dispatch({
      type: "SET_FILE_MESSAGE",
      payload: { position: "left_bubble", msg: name },
    });
    setName("");
    const response = await API.get("/fileGPT", {
      params: {
        query: name,
      },
    });
    if (response.data.ok === "ok") {
      console.log("hey");
      dispatch({
        type: "SET_FILE_MESSAGE",
        payload: { position: "right_bubble", msg: response.data.response },
      });
    }
  };
  const gDocQuery = async () => {
    dispatch1({
      type: "SET_GDOC_MESSAGE",
      payload: { position: "left_bubble", msg: name },
    });
    setName("");
    const response = await API.get("/gdocGPT", {
      params: {
        query: name,
      },
    });
    if (response.data.ok === "ok") {
      console.log("hey");
      dispatch1({
        type: "SET_GDOC_MESSAGE",
        payload: { position: "right_bubble", msg: response.data.response },
      });
    }
  };
  const uploadGDocs = async () => {
    const response = await API.post("/feed_gdoc", {
      doc_list: gDocLink?.toString(),
    });
    if (response.data.ok === "ok") {
      console.log("upload the docs");
    }
  };
  const sendQuery = () => {
    if (value === 0) {
      fileQuery();
    } else if (value === 2) {
      gDocQuery();
    }
  };
  return (
    <>
      <AppBar className="header">
        <Toolbar className="headerToolBar">
          <Typography variant="h6" component="div" className="headerTypo">
            RIOAI - Real Intelligence on Artificial Intelligence
          </Typography>
        </Toolbar>
      </AppBar>
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
              <h3>PerfGPT</h3>
              <Messages messages={state1.gDocMessage} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className="comma-link">
                Provide the Google Docs link separated by &quot;,&quot;
              </div>
              <TextField
                fullWidth
                label="Google Doc link"
                id="google_doc_input"
                value={gDocLink}
                onChange={(event) => {
                  setGDocLink(event.target.value);
                }}
              />
              <Button
                variant="outlined"
                className="google-uploadbtn"
                startIcon={<UploadIcon />}
                onClick={uploadGDocs}
              >
                Upload
              </Button>
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
