import React from 'react';
import { Link } from 'react-router-dom'; 

function Homepage() {
  return (
    <div>
      <main role="main" style={{ marginTop: 150 }}>
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">WelCome! Let's join us</h1>
            <p>
              Join the conversation and meet new friends!
            </p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <Link to="/login" className="btn btn-primary btn-lg mr-3">Login</Link>
            <Link to="/register" className="btn btn-secondary btn-lg">Registration</Link>
          </div>
          <hr />
        </div>
      </main>
      <footer className="container">
        <p>© Company 2022-2023</p>
      </footer>
    </div>
  )
}

export default Homepage;
