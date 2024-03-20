// @ts-nocheck
import "./App.css";

import {
  AppBar,
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  IconButton,
  Snackbar,
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
import {
  initialState2,
  perfMessageReducer,
} from "./reducers/perfMessageReducer";
import { initialState3, webMessageReducer } from "./reducers/webReducer";
import { useReducer, useState } from "react";

import API from "./axiosInstance";
import ChatIcon from "@mui/icons-material/Chat";
import FileGPT from "./FileInput";
import GoogleIcon from "@mui/icons-material/Google";
import InputIcon from "@mui/icons-material/Input";
import LanguageIcon from "@mui/icons-material/Language";
import Messages from "./Messages";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import { SystemUpdateAltSharp } from "@mui/icons-material";
import TabPanel from "./TabPanel";
import UploadIcon from "@mui/icons-material/Upload";
import { saveAs } from "file-saver";

function App() {
  const [value, setValue] = useState(0);
  const [name, setName] = useState("");
  const [gDocLink, setGDocLink] = useState("");
  const [webLink, setWebLink] = useState("");
  const [snakMessage, setSnakMessage] = useState("");
  const [state, dispatch] = useReducer(fileMessageReducer, initialState);
  const [state1, dispatch1] = useReducer(gDocMessageReducer, initialState1);
  const [state2, dispatch2] = useReducer(perfMessageReducer, initialState2);
  const [state3, dispatch3] = useReducer(webMessageReducer, initialState3);
  const [open, setOpen] = useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fileQuery = async () => {
    try {
      dispatch({
        type: "SET_FILE_MESSAGE",
        payload: { position: "left_bubble", msg: name },
      });
      dispatch({
        type: "SET_FILE_MESSAGE",
        payload: { position: "right_bubble", msg: "skeleton" },
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
          type: "REMOVE_SKELETON",
        });
        dispatch({
          type: "SET_FILE_MESSAGE",
          payload: { position: "right_bubble", msg: response.data.response },
        });
      } else {
        setSnakMessage("Something went wrong.Please try again later!");
        setOpen(true);
      }
    } catch {
      setSnakMessage("Something went wrong.Please try again later!");
      setOpen(true);
    }
  };
  const gDocQuery = async () => {
    try {
      dispatch1({
        type: "SET_GDOC_MESSAGE",
        payload: { position: "left_bubble", msg: name },
      });
      dispatch1({
        type: "SET_GDOC_MESSAGE",
        payload: { position: "right_bubble", msg: "skeleton" },
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
          type: "REMOVE_SKELETON",
        });
        dispatch1({
          type: "SET_GDOC_MESSAGE",
          payload: { position: "right_bubble", msg: response.data.response },
        });
      } else {
        setSnakMessage("Something went wrong.Please try again later!");
        setOpen(true);
      }
    } catch {
      setSnakMessage("Something went wrong.Please try again later!");
      setOpen(true);
    }
  };
  const uploadGDocs = async () => {
    try {
      const response = await API.get("/feed_gdoc", {
        params: { doc_list: gDocLink },
      });
      if (response.data.ok === "ok") {
        setSnakMessage("Uploaded the given doc(s)");
        setOpen(true);
      }
    } catch (error) {
      setSnakMessage("Something went wrong.Please try again later!");
      setOpen(true);
    }
  };
  const perfQuery = async () => {
    dispatch2({
      type: "SET_PERF_MESSAGE",
      payload: { position: "left_bubble", msg: name },
    });
    dispatch2({
      type: "SET_PERF_MESSAGE",
      payload: { position: "right_bubble", msg: "skeleton" },
    });
    setName("");
    const response = await API.get("/perfGPT", {
      params: {
        query: name,
      },
    });
    if (response.data.ok === "ok") {
      console.log("hey");
      dispatch2({
        type: "REMOVE_SKELETON",
      });
      dispatch2({
        type: "SET_PERF_MESSAGE",
        payload: { position: "right_bubble", msg: response.data.response },
      });
    }
  };
  const sendQuery = () => {
    if (value === 0) {
      fileQuery();
    } else if (value === 2) {
      gDocQuery();
    } else if (value === 1) {
      perfQuery();
    } else if (value === 3) {
      webQuery();
    }
  };
  const saveChatData = () => {
    let chatData = [];
    if (value === 0) {
      state.fileMessage.forEach((item) => {
        if (item.position === "left_bubble")
          chatData.push("User: " + item.msg + "\n");
        else chatData.push("RioAI: " + item.msg + "\n");
      });
    } else if (value === 1) {
      state2.perfMessage.forEach((item) => {
        if (item.position === "left_bubble")
          chatData.push("User: " + item.msg + "\n");
        else chatData.push("RioAI: " + item.msg + "\n");
      });
    } else if (value === 2) {
      state1.gDocMessage.forEach((item) => {
        if (item.position === "left_bubble")
          chatData.push("User: " + item.msg + "\n");
        else chatData.push("RioAI: " + item.msg + "\n");
      });
    }
    const file = new Blob(chatData, { type: "text/plain;charset=utf-8" });
    saveAs(file, "RioAI.txt");
  };
  const uploadWebLink = async () => {
    try {
      const response = await API.get("/feed_url", {
        params: { web_url: webLink },
      });
      if (response.data.ok === "ok") {
        setSnakMessage("Link is added");
        setOpen(true);
      }
    } catch (error) {
      setSnakMessage("Something went wrong.Please try again later!");
      setOpen(true);
    }
  };
  const webQuery = async () => {
    try {
      dispatch3({
        type: "SET_WEB_MESSAGE",
        payload: { position: "left_bubble", msg: name },
      });
      dispatch3({
        type: "SET_WEB_MESSAGE",
        payload: { position: "right_bubble", msg: "skeleton" },
      });
      setName("");
      const response = await API.get("/webGPT", {
        params: {
          query: name,
        },
      });
      if (response.data.ok === "ok") {
        console.log("hey");
        dispatch3({
          type: "REMOVE_SKELETON",
        });
        dispatch3({
          type: "SET_WEB_MESSAGE",
          payload: { position: "right_bubble", msg: response.data.response },
        });
      } else {
        setSnakMessage("Something went wrong.Please try again later!");
        setOpen(true);
      }
    } catch {
      setSnakMessage("Something went wrong.Please try again later!");
      setOpen(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnakMessage("");
    setOpen(false);
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
      <Container maxWidth="lg" style={{ marginTop: "5%" }}>
        <Box className="box-class">
          {snakMessage && (
            <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={handleClose}
              message={snakMessage}
            />
          )}

          <Card variant="outlined" className="card-wrapper">
            <CardHeader
              title={
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="icon tabs example"
                >
                  <Tab icon={<InputIcon />} aria-label="inputFile" />
                  <Tab icon={<ChatIcon />} aria-label="chatbox" />
                  <Tab icon={<GoogleIcon />} aria-label="googleDoc" />
                  <Tab icon={<LanguageIcon />} aria-label="webGPT" />
                </Tabs>
              }
              action={
                <IconButton aria-label="export/import" onClick={saveChatData}>
                  <SystemUpdateAltSharp />
                </IconButton>
              }
            />
            <TabPanel value={value} index={0}>
              <FileGPT />
              <Messages messages={state.fileMessage} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <h3>PerfGPT</h3>
              <Messages messages={state2.perfMessage} />
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
              <Messages messages={state1.gDocMessage} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <h3>WebGPT</h3>
              <TextField
                fullWidth
                label="Provide the website link to crawl"
                id="google_doc_input"
                value={webLink}
                onChange={(event) => {
                  setWebLink(event.target.value);
                }}
              />
              <Button
                variant="outlined"
                className="google-uploadbtn"
                startIcon={<SearchIcon />}
                onClick={uploadWebLink}
              >
                Search
              </Button>
              <Messages messages={state3.webMessage} />
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
