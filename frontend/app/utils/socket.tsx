import { io } from "socket.io-client";

const socket = io("https://holden.onrender.com/", {
    transports: ['websocket'],
});

export default socket; 