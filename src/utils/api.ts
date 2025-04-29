import axios from "axios";
import { io } from "socket.io-client";
 const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const api=axios.create({
    baseURL:`${BASE_URL}/api`,
    withCredentials:true
})
export const socket = io(BASE_URL)
export default api  