// App.js
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

import Homepage from './views/Homepage';
import Registerpage from './views/Registerpage';
import Loginpage from './views/Loginpage';
import Navbar from './views/Navbar';
import Message from './views/Message';
import MessageDetail from './views/MessageDetail';
import SearchUsers from './views/SearchUsers';
import Inbox from './views/inbox';

import WebSocketProvider from './context/WebSocketProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <WebSocketProvider> 
          <Navbar />
          <Switch>
            <Route component={Loginpage} path="/login" />
            <Route component={Registerpage} path="/register" exact />
            <Route component={Homepage} path="/" exact />
            <Route component={Inbox} path="/inbox" exact />
            <Route component={Message} path="/userList" exact />
            <Route component={MessageDetail} path="/inbox/:id" exact />
            <Route component={SearchUsers} path="/search/:username" exact />
          </Switch>
        </WebSocketProvider> 
      </AuthProvider>
    </Router>
  );
}

export default App;
