import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from './context/AuthContext';

import Homepage from './views/Homepage';
import Registerpage from './views/Registerpage';
import Loginpage from './views/Loginpage';
import Navbar from './views/Navbar';
import Message from './views/Message';
import MessageDetail from './views/MessageDetail';
import SearchUsers from './views/SearchUsers';

// Import the WebSocketProvider
import WebSocketProvider from './context/WebSocketProvider';
import WebSocketContext from './context/WebSocketContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <WebSocketProvider> {/* Wrap your components with the WebSocketProvider */}
          <Navbar />
          <Switch>
            <Route component={Loginpage} path="/login" />
            <Route component={Registerpage} path="/register" exact />
            <Route component={Homepage} path="/" exact />
            <Route component={Message} path="/inbox" exact />
            <Route component={MessageDetail} path="/inbox/:id" exact />
            <Route component={SearchUsers} path="/search/:username" exact />
          </Switch>
        </WebSocketProvider> {/* End of the WebSocketProvider wrapper */}
      </AuthProvider>
    </Router>
  );
}

export default App;
