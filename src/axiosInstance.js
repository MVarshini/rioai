import axios from "axios";

export default axios.create({
  baseURL: "http://10.1.38.227:5000/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
