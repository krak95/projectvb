import io from "socket.io-client";
const socket = io(
    // 'http://10.76.76.44:8000', 
    'http://localhost:8000',
    {
        transports: ["websocket"]
    });
console.log(socket)
export default socket