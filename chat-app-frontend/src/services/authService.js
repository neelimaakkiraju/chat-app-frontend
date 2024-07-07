import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const register = async (username, email, password) => {
  return await axios.post(`${API_URL}/auth/local/register`, { username, email, password });
};

export const login = async (email, password) => {
  return await axios.post(`${API_URL}/auth/local`, { identifier: email, password });
};
