import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WebSocketProvider from './context/WebSocketProvider'; // Ensure this path is correct

ReactDOM.createRoot(document.getElementById('root')).render(
    <WebSocketProvider>
        <App />
    </WebSocketProvider>
);
