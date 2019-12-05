import React from 'react';
import auth from '../services/auth';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import validationService from '../services/validationService';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        email: '',
        password: ''
      },
      errors: {}
    };
  }

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label('Email address'),
    password: Joi.string()
      .min(8)
      .max(255)
      .label('Password')
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = validationService.validate(
      this.state.credentials,
      this.schema
    );
    this.setState({ errors: errors || {} });
    if (errors) return;
    auth.login(this.state.credentials, (err, resopnse) => {
      if (err) {
        if (err.status === 401) {
          this.setState({ errors: { message: 'Invalid Login' } });
          return;
        }
        return console.log(err);
      }
      const { referrer } = this.props.location;
      return this.props.history.push(referrer ? referrer : '/');
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    const clonedCredentials = { ...this.state.credentials };
    clonedCredentials[name] = value;
    this.setState({ credentials: clonedCredentials, errors: {} });
  };

  render() {
    return auth.isAuthenticated() ? (
      <Redirect to="/" />
    ) : (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal text-center">
          Please sign in
        </h1>
        {Object.keys(this.state.errors).length > 0 &&
          Object.keys(this.state.errors).map((key, i) => {
            return (
              <div className="alert alert-danger" role="alert" key={i}>
                {this.state.errors[key]}
              </div>
            );
          })}
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="text"
          id="inputEmail"
          name="email"
          className="form-control"
          placeholder="Email address"
          autoComplete="username"
          onChange={this.handleChange}
          autoFocus
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          name="password"
          className="form-control"
          placeholder="Password"
          autoComplete="current-password"
          onChange={this.handleChange}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    );
  }
}

export default SignIn;
