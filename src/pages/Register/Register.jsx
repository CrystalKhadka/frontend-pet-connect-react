import React, { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [obsurePassword, setObsurePassword] = useState(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [genderError, setGenderError] = useState("");

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const setDefaultError = () => {
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setBirthDateError("");
    setPhoneError("");
    setAddressError("");
    setGenderError("");
  };

  var validate = () => {
    var isValid = true;

    // validate the first name
    if (firstName.trim() === "") {
      setFirstNameError("First name is required");
      isValid = false;
    }
    if (lastName.trim() === "") {
      setLastNameError("Last name is required");
      isValid = false;
    }
    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    }

    if (birthDate.trim() === "") {
      setBirthDateError("Birth Date is required");
      isValid = false;
    }
    if (phone.trim() === "") {
      setPhoneError("Phone is required");
      isValid = false;
    }
    if (address.trim() === "") {
      setAddressError("Address is required");
      isValid = false;
    }
    if (gender.trim() === "") {
      setGenderError("Gender is required");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDefaultError();
    if (!validate()) {
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password doesn't match");
      return;
    }
  };

  return (
    <div className="min-vh-100 py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="card border-0 shadow-lg rounded-lg">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="firstName">First Name</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="bi bi-person"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          onChange={(e) => setFirstName(e.target.value)}
                          id="firstName"
                          value={firstName}
                        />
                      </div>
                      {firstNameError && (
                        <p className="text-danger">{firstNameError}</p>
                      )}
                    </div>
                    <div className="col">
                      <label htmlFor="lastName">Last Name</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="bi bi-person"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          onChange={(e) => setLastName(e.target.value)}
                          id="lastName"
                          value={lastName}
                        />
                      </div>
                      {lastNameError && (
                        <p className="text-danger">{lastNameError}</p>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="bi bi-envelope"></i>
                        </span>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        value={email}
                      />
                    </div>
                    {emailError && <p className="text-danger">{emailError}</p>}
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="password">Password</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="bi bi-lock"></i>
                          </span>
                        </div>
                        <input
                          type={obsurePassword ? "password" : "text"}
                          className="form-control"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                          id="password"
                          value={password}
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text"
                            onClick={() => setObsurePassword(!obsurePassword)}
                          >
                            <i
                              className={
                                obsurePassword ? "bi bi-eye" : "bi bi-eye-slash"
                              }
                            ></i>
                          </span>
                        </div>
                      </div>
                      {passwordError && (
                        <p className="text-danger">{passwordError}</p>
                      )}
                    </div>
                    <div className="col">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="bi bi-lock"></i>
                          </span>
                        </div>
                        <input
                          type={obsurePassword ? "password" : "text"}
                          className="form-control"
                          placeholder="Confirm Password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          id="confirmPassword"
                          value={confirmPassword}
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text"
                            onClick={() => setObsurePassword(!obsurePassword)}
                          >
                            <i
                              className={
                                obsurePassword ? "bi bi-eye" : "bi bi-eye-slash"
                              }
                            ></i>
                          </span>
                        </div>
                      </div>
                      {confirmPasswordError && (
                        <p className="text-danger">{confirmPasswordError}</p>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="birthDate">Birth Date</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="bi bi-calendar"></i>
                        </span>
                      </div>
                      <input
                        type="date"
                        className="form-control"
                        onChange={(e) => setBirthDate(e.target.value)}
                        id="birthDate"
                        value={birthDate}
                      />
                    </div>
                    {birthDateError && (
                      <p className="text-danger">{birthDateError}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone">Phone</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="bi bi-telephone"></i>
                        </span>
                      </div>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Phone"
                        onChange={(e) => setPhone(e.target.value)}
                        id="phone"
                        value={phone}
                      />
                    </div>
                    {phoneError && <p className="text-danger">{phoneError}</p>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address">Address</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="bi bi-house"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                        id="address"
                        value={address}
                      />
                    </div>
                    {addressError && (
                      <p className="text-danger">{addressError}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gender">Gender</label>
                    <div className="d-flex justify-content-around">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="male"
                          value="male"
                          checked={gender === "male"}
                          onChange={handleGenderChange}
                        />
                        <label className="form-check-label" htmlFor="male">
                          Male
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="female"
                          value="female"
                          checked={gender === "female"}
                          onChange={handleGenderChange}
                        />
                        <label className="form-check-label" htmlFor="female">
                          Female
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="other"
                          value="other"
                          checked={gender === "other"}
                          onChange={handleGenderChange}
                        />
                        <label className="form-check-label" htmlFor="other">
                          Other
                        </label>
                      </div>
                    </div>
                    {genderError && (
                      <p className="text-danger">{genderError}</p>
                    )}
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="acceptTerms"
                    />
                    <label className="form-check-label" htmlFor="acceptTerms">
                      I accept the <a href="/">Terms of Use</a> &{" "}
                      <a href="/">Privacy Policy</a>
                    </label>
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block py-3"
                    >
                      Register Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
