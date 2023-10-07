// Inbox.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

function Inbox() {
    const [messages, setMessages] = useState([]);
    const token = localStorage.getItem('authTokens');
    const decoded = jwtDecode(token);
    const user_id = decoded.user_id;
    const axios = useAxios();
    const baseURL = 'http://127.0.0.1:8000/api';

    useEffect(() => {
        axios.get(baseURL + `/my-messages/${user_id}/`)
        .then(response => {
            setMessages(response.data);
        }).catch(err => {
            console.log(err);
        });
    }, [user_id]);

    return (
        <div className="inbox-container">
            <h2>Your Conversations</h2>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        {/* Link to message detail */}
                        <Link to={`/inbox/${message.sender.id === user_id ? message.reciever.id : message.sender.id}`}>
                            {/* Display the username of the other participant in the conversation */}
                            <span>{message.sender.id === user_id ? message.reciever.username : message.sender.username}</span>
                            <div className="last-message">
                                {/* Display the last message's shortened content */}
                                <small>{message.message.slice(0, 40)}...</small>
                                <small>{moment.utc(message.date).local().startOf('seconds').fromNow()}</small>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Inbox;
