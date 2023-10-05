import React, { useState, useEffect, useContext } from 'react';
import './style/Message.css';
import jwtDecode from 'jwt-decode';
import WebSocketContext from '../context/WebSocketContext';

function Message() {
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState("");

    const token = localStorage.getItem('authTokens');
    const decoded = jwtDecode(token);
    const user_id = decoded.user_id;

    const webSocket = useContext(WebSocketContext);

    useEffect(() => {
        webSocket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            if (newMessage && (newMessage.sender.id === user_id || newMessage.receiver.id === user_id)) {
                setMessages(prevMessages => [...prevMessages, newMessage]);
            }
        };

        return () => {
            webSocket.onmessage = null;
        };

    }, [webSocket]);

    const sendMessage = () => {
        if (messageContent.trim() !== "") {
            webSocket.send(JSON.stringify({
                type: 'SEND_MESSAGE',
                content: messageContent,
                receiver_id: null // You'd need a valid receiver_id. For now, we'll leave it null.
            }));
            setMessageContent("");
        }
    };

    return (
        <div>
            {/* Message sending part */}
            <div className="flex-grow-0 py-3 px-4 border-top">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type your message"
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Message;
