import { useState, useEffect } from "react";

const useWebSocket = (url) => {
    const [socket, setSocket] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const ws = new WebSocket(url);
        ws.binaryType = "blob"; // Expect binary data (JPEG frames)

        ws.onopen = () => console.log("WebSocket Connected");
        ws.onmessage = (event) => setData(event.data);
        ws.onerror = (err) => console.error("WebSocket Error:", err);
        ws.onclose = () => console.log("WebSocket Disconnected");

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [url]);

    return { socket, data };
};

export default useWebSocket;
