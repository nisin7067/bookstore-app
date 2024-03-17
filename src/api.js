import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.181.80:5000/api', // Your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
