import axios from 'axios';
import querystring from 'querystring';
const getToken = () => localStorage.getItem('token');

export const queryfy = (data = {}) => {
  const string = querystring.stringify(data);
  return string.length ? '?'.concat(string) : '';
};

export const api = axios.create({
  timeout: 50000,
  headers: {
    'Authorization': getToken(),
  }
});
