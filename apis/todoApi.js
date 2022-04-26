import axios from "axios";
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const headers = {
  "Content-Type": "application/json",
};

export default axios.create({
  baseURL: "http://192.168.0.180:8000/routes/",
  headers: headers,
});
