import axios from 'axios';
import auth from './auth';

class DataService {
  createYarn(data, cb) {
    axios
      .post(`${process.env.REACT_APP_API_URI}/yarns`, data, {
        headers: { 'x-auth-token': auth.getToken() }
      })
      .then(response => {
        cb(null, response);
      })
      .catch(err => {
        cb(err.response, null);
      });
  }
}

export default new DataService();
