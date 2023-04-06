import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://showcheck.herokuapp.com';

export default axios;