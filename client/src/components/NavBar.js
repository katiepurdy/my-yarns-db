import React from 'react';
import auth from '../services/auth';
import { Link, withRouter } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a href="/" className="navbar-brand d-flex align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            aria-hidden="true"
            className="mr-2"
            viewBox="0 0 24 24"
            focusable="false"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
          <strong>My Yarns DB</strong>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample07"
          aria-controls="navbarsExample07"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample07">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/yarns/create">
                Add New Yarn
                <span className="sr-only">Add New Yarn</span>
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav navbar-right">
            {auth.isAuthenticated() ? (
              <React.Fragment>
                <li className="nav-item active dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/#"
                    id="dropdown07"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Welcome {auth.getUser()}!
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right w-100"
                    aria-labelledby="dropdown07"
                  >
                    <Link className="dropdown-item" to="/signout">
                      Logout
                    </Link>
                  </div>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    Login<span className="sr-only">Login</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register<span className="sr-only">Register</span>
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(NavBar);
