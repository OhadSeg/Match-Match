import axios from 'axios';

const url = 'http://localhost:8080/api/'

const instance = axios.create({
    baseURL: url,

    headers: {
      'Content-Type': 'application/json',
    },
  });

  export default instance;