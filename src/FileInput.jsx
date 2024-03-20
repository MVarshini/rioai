// @ts-nocheck
import {
  fileMessageReducer,
  initialState,
} from "./reducers/fileMessageReducer";
import { useReducer, useState } from "react";

import API from "./axiosInstance";
// import API from "./axiosInstance";
import { Button } from "@mui/material";
import Messages from "./Messages";
import { uid } from "./helper";

// const FileGPT = () => {
//   //   const [selectedFile, setSelectedFile] = useState([]);
//   //   const [selectedFileName, setSelectedFileName] = useState([]);
//   //   const handleselectedFile = (event) => {
//   //     setSelectedFile([
//   //       event.target.files[0],
//   //       ...selectedFile, // Put old items at the end
//   //     ]);
//   //     setSelectedFileName([
//   //       event.target.files[0].name,
//   //       ...selectedFileName, // Put old items at the end
//   //     ]);
//   //   };

//   const [selectedFile, setSelectedFile] = useState();
//   const [selectedFileName, setSelectedFileName] = useState();

//   const handleselectedFile = (event) => {
//     // setSelectedFile(event.target.files[0]);
//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const text = e.target.result;
//       console.log(text);
//     //  alert(text);
//     };
//     reader.readAsText(event.target.files[0]);
//     setSelectedFileName(event.target.files[0].name);
//   };
//   const sendFile = () => {
//     console.log(selectedFile);
//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     // selectedFile.forEach((file) => formData.append("files", file));

//     console.log(formData);
//     // const response = API.post("/upload_files", { formData });
//     // if (response.status === "200") {
//     //   console.log("hey");
//     // }
//   };

//   return (
//     <>
//       {/* <input
//         accept="image/*"
//         className="file upload"
//         id="contained-button-file"
//         multiple
//         style={{ display: "none" }}
//         type="file"
//       />
//       <label htmlFor="contained-button-file">
//         <Button variant="contained" color="primary" component="span">
//           Upload
//         </Button>
//       </label> */}
//       <form>
//         <input
//           type="file"
//           name="file"
//           id="file-upload"
//           accept="application/pdf"
//           onChange={handleselectedFile}
//           style={{ display: "none" }}
//         />
//         <label htmlFor="file-upload">
//           <Button variant="contained" color="primary" component="span">
//             Importer STL*
//           </Button>
//         </label>
//         {/* {selectedFileName?.length > 0 &&
//         selectedFileName.map((file) => <span key={uid()}>{file}</span>)} */}

//         <span key={uid()}>{selectedFileName}</span>
//         <Button onClick={sendFile}>Upload</Button>
//       </form>
//     </>
//   );
// };

// export default FileGPT;

const FileGPT = () => {
  const [selectedFileName, setSelectedFileName] = useState();

  const handleFileUpload = (event) => {
    // get the selected file from the input
    const file = event.target.files[0];

    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("file", file);
    // make a POST request to the File Upload API with the FormData object and Rapid API headers
    API.post("/upload_files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        // handle the response
        setSelectedFileName(event.target.files[0].name);
        console.log(response);
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };
  // render a simple input element with an onChange event listener that calls the handleFileUpload function
  return (
    <div>
      <input
        type="file"
        name="file"
        id="file-upload"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" color="primary" component="span">
          Upload file
        </Button>
      </label>
      <span key={uid()}>{selectedFileName}</span>
    </div>
  );
};
export default FileGPT;
