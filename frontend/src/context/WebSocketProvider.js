// WebSocketProvider.js
import React, { useState, useEffect } from 'react';
import WebSocketContext from './WebSocketContext';

export const WebSocketProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const wsInstance = new WebSocket('ws://127.0.0.1:8000/ws/api/');

        wsInstance.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, data]);
        };

        setWs(wsInstance);
        return () => wsInstance.close();
    }, []);

    return (
        <WebSocketContext.Provider value={{ ws, messages, setMessages }}>
            {children}
        </WebSocketContext.Provider>
    );
};
export default WebSocketProvider;
