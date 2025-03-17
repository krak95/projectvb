import React, { useRef, useEffect } from "react";

const CameraStream = () => {
    const canvasRef = useRef(null);
    const wsRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        wsRef.current = new WebSocket("ws://localhost:5000/ws");
        wsRef.current.binaryType = "blob";

        wsRef.current.onmessage = (event) => {
            const img = new Image();
            img.src = URL.createObjectURL(event.data);
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
        };
        

        return () => {
            wsRef.current.close();
        };
    }, []);

    return <canvas ref={canvasRef} width="640" height="480" />;
};

export default CameraStream;


