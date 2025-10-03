import axios from 'axios';

const client = axios.create({
  timeout: 3000,
});

export default client;
