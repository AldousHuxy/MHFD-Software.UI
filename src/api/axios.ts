import { SERVER_URL } from '@/env';
import axios from 'axios';

export const server = axios.create({ baseURL: SERVER_URL });