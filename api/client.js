import axios from "axios";
import constants from "../redux/constants";

const { BASE_URL } = constants;

const client = axios.create({ baseURL: BASE_URL })

// console.log('ddddd', client);
export default client