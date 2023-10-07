import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'

function Loginpage() {
  
  const { loginUser } = useContext(AuthContext);
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await loginUser(email, password);

      if (result) {
        if (result.success) {
          console.log("Successful login. Initialize WebSocket here if needed.");
        } else {
          setLoginError(result.message || "Login error. Please try again.");
        }
      } else {
        setLoginError("Login error. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Login error. Please try again.");
    }
  };

  return (
    <div>
      <>
        <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card" style={{ borderRadius: "1rem" }}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img
                        src="https://plus.unsplash.com/premium_photo-1670071482545-98b4cf365136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hhdGluZ3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                        alt="login form"
                        className="img-fluid justify-content-center p-2"
                        style={{ borderRadius: "1rem 0 0 1rem" }}
                      />
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                        <form onSubmit={handleSubmit}>
                          <div className="d-flex align-items-center mb-3 pb-1">
                            <i
                              className="fas fa-cubes fa-2x me-3"
                              style={{ color: "#ff6219" }}
                            />
                            <span className="h2 fw-bold mb-0">Welcome back 👋</span>
                          </div>
                          <h5
                            className="fw-normal mb-3 pb-3"
                            style={{ letterSpacing: 1 }}
                          >
                            Sign into your account
                          </h5>
                          <div className="form-outline mb-4">
                            <input
                              type="email"
                              id="form2Example17"
                              className="form-control form-control-lg"
                              name='email'
                            />
                            <label className="form-label" htmlFor="form2Example17">
                              Email address
                            </label>
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="form2Example27"
                              className="form-control form-control-lg"
                              name='password'
                            />
                            <label className="form-label" htmlFor="form2Example27">
                              Password
                            </label>
                          </div>
                          <div className="pt-1 mb-4">
                            <button
                              className="btn btn-dark btn-lg btn-block"
                              type="submit"
                            >
                              Login
                            </button>
                          </div>
                          {loginError && <div className="alert alert-danger mt-2">{loginError}</div>}
                          <a className="small text-muted" href="#!">
                            Forgot password?
                          </a>
                          <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                            Don't have an account?{" "}
                            <Link to="/register" style={{ color: "#393f81" }}>
                              Register Now 
                            </Link>
                          </p>
                          <a href="#!" className="small text-muted">
                            Terms of use.
                          </a>
                          <a href="#!" className="small text-muted">
                            Privacy policy
                          </a>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="bg-light text-center text-lg-start">
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(39, 138, 245, 0.4)" }}
          >
            © 2023 - till date Copyright:
            <a className="text-dark" href="/">
              ChatApp.com
            </a>
          </div>
        </footer>
      </>
    </div>
  );
}

export default Loginpage;
