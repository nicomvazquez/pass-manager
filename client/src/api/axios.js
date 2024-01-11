import axios from "axios";

const instalce = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api',
  withCredentials: true,
});

export default instalce;
