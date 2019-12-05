import axios from 'axios';
import decode from 'jwt-decode';

class Auth {
  login(credentials, cb) {
    axios
      .post(`${process.env.REACT_APP_API_URI}/users/login`, credentials)
      .then(response => {
        localStorage.setItem('x-auth-token', response.headers['x-auth-token']);
        cb(null, response);
      })
      .catch(err => {
        cb(err.response, null);
      });
  }

  logout() {
    localStorage.removeItem('x-auth-token');
  }

  isAuthenticated() {
    return localStorage.getItem('x-auth-token') !== null;
  }

  register(userInfo, cb) {
    axios
      .post(`${process.env.REACT_APP_API_URI}/users/register`, userInfo)
      .then(response => {
        localStorage.setItem('x-auth-token', response.headers['x-auth-token']);
        cb(null, response);
      })
      .catch(err => {
        console.log(err.response);
        cb(err.response, null);
      });
  }

  getToken() {
    return localStorage.getItem('x-auth-token');
  }

  getUser() {
    const token = localStorage.getItem('x-auth-token');
    if (token) {
      const decoded = decode(token);
      return decoded.email;
    }
    return null;
  }
}

export default new Auth();
