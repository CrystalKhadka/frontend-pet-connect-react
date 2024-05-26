import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [obscurePassword, setObscurePassword] = useState(true);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    if (email.trim() === "") {
      setEmailError("Email is required");
      return false;
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      return false;
    }
  };

  const resetErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetErrors();

    
    if (!validate()) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    console.log(email);

    // Add your login functionality here
  };
  return (
    <div className="min-vh-100 py-5 bg-light d-flex align-items-center">
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
                      <span className="input-group-text">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="abc@gmail.com"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    {emailError && <p className="text-danger">{emailError}</p>}
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
                        type={obscurePassword ? "password" : "text"}
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        value={password}
                      />
                      <div className="input-group-append">
                        <span
                          className="input-group-text"
                          onClick={() => setObscurePassword(!obscurePassword)}
                        >
                          <i
                            className={
                              obscurePassword ? "bi bi-eye" : "bi bi-eye-slash"
                            }
                          ></i>
                        </span>
                      </div>
                    </div>
                    {passwordError && (
                      <p className="text-danger">{passwordError}</p>
                    )}
                  </div>

                  <div className="text-end mb-3">
                    <button
                      type="button"
                      className="btn btn-link"
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
                      onClick={handleSubmit}
                    >
                      Log in
                    </button>
                  </div>
                </form>
                <div className="text-center mb-4">
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <a href="/register" className="text-primary">
                      Sign up
                    </a>
                  </p>
                </div>
                <div>
                  <p className="mt-3 text-center">Continue With</p>
                  <div className="text-center mb-3">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-block"
                      onClick={() => {
                        // Add your Google login functionality here
                      }}
                    >
                      <img
                        src="./assets/icons/google.png"
                        className="me-2"
                        alt="Google"
                        style={{ width: "20px", height: "20px" }}
                      />
                      Google
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
