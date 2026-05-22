import axios from "axios";

const api = axios.create({

  baseURL:
    "https://drivefleet-server-zqxb.onrender.com",

  withCredentials: true,
});

export default api;