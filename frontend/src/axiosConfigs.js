import axios from 'axios';

export const  api = axios.create({
    baseURL:`https://localhost:44346/api/`
  });