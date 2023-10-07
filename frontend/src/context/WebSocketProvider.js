import React, { useState, useEffect } from 'react';
import WebSocketContext from './WebSocketContext';

export const WebSocketProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);
    const messageListeners = []; 

    useEffect(() => {
        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [ws]);

    const addMessageListener = (listener) => {
        messageListeners.push(listener);
    };

    const removeMessageListener = (listener) => {
        const index = messageListeners.indexOf(listener);
        if (index > -1) {
            messageListeners.splice(index, 1);
        }
    };

    const connect = (roomName) => {
        if (ws) ws.close();

        const wsInstance = new WebSocket(`ws://127.0.0.1:8000/ws/api/${roomName}/`);

        wsInstance.onopen = () => {
            console.log("WebSocket is now open.");
        };

        wsInstance.onclose = (event) => {
            console.log("WebSocket is now closed.");
            if (!event.wasClean) {
                setTimeout(() => connect(roomName), 5000);
            }
        };

        wsInstance.onerror = (error) => {
            console.error("WebSocket encountered an error:", error);
        };

        wsInstance.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, data]);

            
            messageListeners.forEach(listener => listener(data));
        };

        setWs(wsInstance);
    };

    const disconnect = () => {
        if (ws) {
            ws.close();
        }
    };

    const sendMessage = (message) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        } else {
            console.error("WebSocket is not open");
        }
    };

    return (
        <WebSocketContext.Provider value={{ 
            ws, 
            messages, 
            setMessages, 
            connect, 
            disconnect, 
            sendMessage, 
            addMessageListener, 
            removeMessageListener 
        }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketProvider;
