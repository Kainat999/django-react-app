
import React, { useState, useContext } from 'react';
import './style/Message.css';
import jwtDecode from 'jwt-decode';
import WebSocketContext from '../context/WebSocketContext';

function Message() {
    const [messageContent, setMessageContent] = useState("");

    const token = localStorage.getItem('authTokens');
    const decoded = jwtDecode(token);
    const user_id = decoded.user_id;

    const { ws, messages, setMessages } = useContext(WebSocketContext);

    const sendMessage = () => {
        if (messageContent.trim() !== "") {
            ws.send(JSON.stringify({
                type: 'SEND_MESSAGE',
                content: messageContent,
                receiver_id: null
            }));
            setMessageContent("");
        }
    };

    return (
        <div className="message-container">
            <div className="messages-display">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`message-bubble ${msg.sender.id === user_id ? "sent" : "received"}`}
                    >
                        {msg.content}
                    </div>
                ))}
            </div>
            
            <div className="message-input-section">
                <input
                    type="text"
                    placeholder="Type your message"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Message;
