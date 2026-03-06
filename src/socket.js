import { io } from 'socket.io-client';

// Change this based on deployment environment later
const SOCKET_URL = "https://hackoniotwebsitebackend-production.up.railway.app";

export const socket = io(SOCKET_URL);

socket.onAny((event, ...args) => {
    console.log("Received socket event:", event, args);
});
