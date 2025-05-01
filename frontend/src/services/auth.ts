import axios from 'axios';
import { UserCredentials } from '../types';

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (credentials: UserCredentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    localStorage.setItem('token', response.data.access_token);
    return response.data;
};

export const register = async (credentials: UserCredentials) => {
    const response = await axios.post(`${API_URL}/auth/register`, credentials);
    localStorage.setItem('token', response.data.access_token);
    return response.data;
};