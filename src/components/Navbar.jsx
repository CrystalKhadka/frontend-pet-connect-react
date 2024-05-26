import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="./assets/icons/icon.jpg"
              alt="Icon"
              className="App-logo"
            />
          </Link>
          <button
            className="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  exact
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/about"
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/pet-list"
                >
                  Pet List
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/favorite"
                >
                  Favorite
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/settings"
                >
                  Settings
                </NavLink>
              </li>
            </ul>
            {user ? (
              <>
                <div class="dropdown">
                  <button
                    class="btn btn-dark dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.firstName}
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="/profile">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/settings">
                        Settings
                      </a>
                    </li>
                    <li>
                      <button
                        class="dropdown-item"
                        onClick={() => {
                          localStorage.removeItem("user");
                          localStorage.removeItem("token");
                          window.location.href = "/login";
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <form className="d-flex" role="search">
                  <Link to="/login" className="btn btn-primary mx-2" t>
                    Login
                  </Link>
                  <a className="btn btn-primary ms-2" href="/register">
                    Register
                  </a>
                </form>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
