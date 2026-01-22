import { serverUrl } from '@/env';
import axios from 'axios';

export const server = axios.create({ baseURL: serverUrl });