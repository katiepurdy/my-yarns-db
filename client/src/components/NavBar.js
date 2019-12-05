import React from 'react';
import auth from '../services/auth';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a href="/" className="navbar-brand d-flex align-items-center">
          <FontAwesomeIcon icon={faHeart} style={{ marginRight: '1rem' }} />
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
