import React from 'react'

function Homepage() {
  return (
    <div>
      <>
  <main role="madin" style={{ marginTop: 150 }}>
    {/* Main jumbotron for a primary marketing message or call to action */}
    <div className="jumbotron">
      <div className="container">
        <h1 className="display-3">WelCome! Let's join us</h1>
        <p>
          Join the conversation and meet new friends!
        </p>
      </div>
    </div>
    <div className="container">
      {/* Example row of columns */}
      <div className="row">
        <a href="/login" class="btn btn-primary btn-lg mr-3">Login</a>
        <a href="/register" class="btn btn-secondary btn-lg">Registration</a>
        
      </div>
      <hr />
    </div>{" "}
    {/* /container */}
  </main>
  <footer className="container">
    <p>© Company 2022-2023</p>
  </footer>
</>

    </div>
  )
}

export default Homepage