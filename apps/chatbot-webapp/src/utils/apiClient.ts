import axios from 'axios';

import config from '../config';

const apiClient = axios.create({
  baseURL: config.baseApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const globalState = localStorage.getItem('state');
  const token = globalState && JSON.parse(globalState).token
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      const error = { response: { data: { message: 'Seems like your network connection is not stable!' } } }
      return Promise.reject(error)
    }

    return Promise.reject(error);
  }
);

export default apiClient;
