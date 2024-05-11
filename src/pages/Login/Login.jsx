import React from "react";

const Login = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-center mb-4">Pet Connect</h1>
          <img className="login-logo" src="./assets/icons/icon.jpg" alt="" />
        </div>
        <div className="col-lg-6 ">
          <div className="form-container ">
            <h2 className="text-center mb-4">Login</h2>
            <form className="d-flex flex-column ">
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  required
                />
              </div>
              <div className="text-right">
                <button
                  type="button"
                  className="btn btn-link mb-3"
                  onClick={() => {
                    // Add your forgot password functionality here
                  }}
                >
                  Forgot your password?
                </button>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-3  w-25"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add your login functionality here
                  }}
                >
                  Log in
                </button>
              </div>
            </form>
            <p className="mb-3 text-center">Continue With</p>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-block mb-3"
                onClick={() => {
                  // Add your Google login functionality here
                }}
              >
                <img
                  src="./assets/icons/google.png"
                  className="google-icon"
                  alt="Google"
                />
                Google
              </button>
            </div>
            <p className="mb-3 text-center">Don't have an account</p>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => {
                  // Add your sign up functionality here
                }}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
