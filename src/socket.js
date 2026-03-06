import { io } from 'socket.io-client';

// Change this based on deployment environment later
const SOCKET_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || `http://${window.location.hostname}:5000`;

export const socket = io(SOCKET_URL);
