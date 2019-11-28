import React from 'react';
import auth from '../services/auth';
import { Redirect } from 'react-router-dom';

const SignOut = props => {
  auth.logout();
  return <Redirect to="/" />;
};

export default SignOut;
