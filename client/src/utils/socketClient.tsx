import { io } from "socket.io-client";


const SOCKET_URL = import.meta.env.VITE_APP_SOCKET_URL;

export const socket = io(SOCKET_URL, {
   autoConnect: false, 
   reconnection: true, 
});



export default socket;
