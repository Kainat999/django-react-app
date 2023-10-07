import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

function Inbox() {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const token = localStorage.getItem('authTokens');
    const decoded = jwtDecode(token);
    const user_id = decoded.user_id;
    const axios = useAxios();
    const baseURL = 'http://127.0.0.1:8000/api';

    useEffect(() => {
        axios.get(baseURL + '/users/')
        .then(response => {
            setUsers(response.data);
        }).catch(err => {
            console.log(err);
        });

        axios.get(baseURL + `/my-messages/${user_id}/`)
        .then(response => {
            setMessages(response.data);
        }).catch(err => {
            console.log(err);
        });
    }, [user_id]);

    const getLastMessage = (userId) => {
        const lastMessage = messages.find(
            msg => (msg.sender.id === userId || msg.receiver.id === userId)
        );
        return lastMessage ? lastMessage.message.slice(0, 40) + "..." : "";
    };

    const getTimeAgo = (userId) => {
        const lastMessage = messages.find(
            msg => (msg.sender.id === userId || msg.receiver.id === userId)
        );
        return lastMessage ? moment.utc(lastMessage.date).local().startOf('seconds').fromNow() : "";
    };

    return (
        <div className="inbox-container">
            <h2>Your Contacts</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <Link to={`/inbox/${user.id}`}>
                            <span>{user.username}</span>
                            <div className="last-message">
                                <small>{getLastMessage(user.id)}</small>
                                <small>{getTimeAgo(user.id)}</small>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Inbox;
