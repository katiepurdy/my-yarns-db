import axios from 'axios';
import auth from './auth';

class DataService {
  getYarns(cb) {
    axios
      .get(`${process.env.REACT_APP_API_URI}/yarns`)
      .then(response => {
        cb(null, response.data);
      })
      .catch(err => {
        cb(err.response, null);
      });
  }

  getYarn(id, cb) {
    axios
      .get(`${process.env.REACT_APP_API_URI}/yarns/${id}`)
      .then(response => {
        cb(null, response.data);
      })
      .catch(err => {
        cb(err.response, null);
      });
  }

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

  updateYarn(id, yarn, cb) {
    delete yarn._id;
    delete yarn.weight;
    delete yarn.grams;
    delete yarn.yardage;
    delete yarn.gauge;
    delete yarn.needleSize;
    delete yarn.fibres;
    delete yarn.colourways;
    delete yarn.machineWashable;
    axios
      .put(`${process.env.REACT_APP_API_URI}/yarns/${id}`, yarn, {
        headers: { 'x-auth-token': auth.getToken() }
      })
      .then(response => {
        cb(null, response.data);
      })
      .catch(err => {
        cb(err.response, null);
      });
  }
}

export default new DataService();
