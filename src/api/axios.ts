import axios from 'axios';

export const server = axios.create({ baseURL: 'https://mhfd-software-api.onrender.com/api' });