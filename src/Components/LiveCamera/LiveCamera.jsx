import React, { useState, useRef } from 'react';

const LiveCamera = () => {
  const [stream, setStream] = useState(null);
  const [webSocket, setWebSocket] = useState(null);
  const videoRef = useRef(null);

  // Establish a WebSocket connection when the component mounts
  const connectWebSocket = () => {
    const socket = new WebSocket('ws://localhost:5000/ws');
    socket.onopen = () => {
      console.log('WebSocket connection established');
      setWebSocket(socket);
    };
    socket.onmessage = (event) => {
      console.log('Received message:', event.data);
    };
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  };

  // Start the camera feed
  const startCamera = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(videoStream);
      videoRef.current.srcObject = videoStream;

      // Send a message to the backend to start the camera
      if (webSocket) {
        webSocket.send('start_camera');
      }

    } catch (err) {
      console.error('Error accessing camera: ', err);
    }
  };

  // Stop the camera feed
  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setStream(null);

      // Send a message to the backend to stop the camera
      if (webSocket) {
        webSocket.send('stop_camera');
      }
    }
  };

  // Connect to WebSocket when the component mounts
  React.useEffect(() => {
    connectWebSocket();
    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, []);

  return (
    <div>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={stopCamera}>Stop Camera</button>
      <video ref={videoRef} autoPlay></video>
    </div>
  );
};

export default LiveCamera