import axios from "axios";

const client = axios.create({ baseURL: 'http://192.168.43.192:4000/api/v1/' })

// console.log('ddddd', client);
export default client