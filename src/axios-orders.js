import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-8434e.firebaseio.com/'
});

export default instance;
