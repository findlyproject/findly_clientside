import axios from "axios";
import { io } from "socket.io-client";
 const BASE_URL = "http://localhost:5000"
const api=axios.create({
    baseURL:`${BASE_URL}/api`,
    withCredentials:true
})
export const socket = io(BASE_URL)
export default api  