import axios from "axios";

const axiosSecure = axios.create({
  baseURL:
    "https://drivefleet-server-zqxb.onrender.com",

  withCredentials: true,
});

export default axiosSecure;