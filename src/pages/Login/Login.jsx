import React from "react";

const Login = () => {
  return (
    <>
      <div className="min-vh-100 py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-6">
              <div className="card border-0 shadow-lg rounded-lg">
                <div className="card-body p-5">
                  <h2 className="text-center mb-4">Pet Connect</h2>

                  <form className="d-flex flex-column">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="bi bi-envelope"></i>
                          </span>
                        </div>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="abc@gmail.com"
                          id="email"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="bi bi-lock"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          id="password"
                          required
                        />
                      </div>
                    </div>

                    <div className="text-right mb-3">
                      <button
                        type="button"
                        className="btn"
                        onClick={() => {
                          // Add your forgot password functionality here
                        }}
                      >
                        Forgot your password?
                      </button>
                    </div>
                    <div className="text-center mb-3">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
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
                  <div className="text-center mb-3">
                    <button
                      type="button"
                      className="btn btn-block"
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
        </div>
      </div>
    </>
  );
};

export default Login;
