import React from 'react';
import auth from '../services/auth';
import Joi from 'joi-browser';
import validationService from '../services/validationService';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      errors: {}
    };
  }

  schema = {
    firstName: Joi.string()
      .min(2)
      .max(100)
      .required()
      .label('First name'),
    lastName: Joi.string()
      .min(2)
      .max(100)
      .required()
      .label('Last name'),
    email: Joi.string()
      .email()
      .required()
      .label('Email address'),
    password: Joi.string()
      .min(8)
      .max(255)
      .required()
      .label('Password'),
    confirmPassword: Joi.string()
      .min(8)
      .max(255)
      .required()
      .label('Confirm password')
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = validationService.validate(this.state.userInfo, this.schema);
    this.setState({ errors: errors || {} });
    if (errors) return;
    auth.register(this.state.userInfo, (err, resopnse) => {
      if (err) {
        if (err.status === 409) {
          this.setState({ errors: { message: 'Passwords do not match' } });
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
    const clonedUserInfo = { ...this.state.userInfo };
    clonedUserInfo[name] = value;
    this.setState({ userInfo: clonedUserInfo, errors: {} });
  };

  render() {
    return (
      <form className="form-register" onSubmit={this.handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal text-center">
          Please register
        </h1>
        {Object.keys(this.state.errors).length > 0 &&
          Object.keys(this.state.errors).map((key, i) => {
            return (
              <div className="alert alert-danger" role="alert" key={i}>
                {this.state.errors[key]}
              </div>
            );
          })}
        <div className="form-group">
          <label htmlFor="inputFirstName" className="sr-only">
            First name
          </label>
          <input
            type="text"
            id="inputFirstName"
            name="firstName"
            className="form-control"
            placeholder="First name"
            onChange={this.handleChange}
            autoFocus
          />
          <label htmlFor="inputLastName" className="sr-only">
            Last name
          </label>
          <input
            type="text"
            id="inputLastName"
            name="lastName"
            className="form-control"
            placeholder="Last name"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="inputEmail"
            name="email"
            className="form-control"
            placeholder="Email address"
            autoComplete="username"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            name="password"
            className="form-control"
            placeholder="Password"
            autoComplete="new-password"
            onChange={this.handleChange}
          />
          <label htmlFor="inputPassword" className="sr-only">
            Confirm Password
          </label>
          <input
            type="password"
            id="inputConfirmPassword"
            name="confirmPassword"
            className="form-control"
            placeholder="Confirm password"
            autoComplete="new-password"
            onChange={this.handleChange}
          />
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Register
        </button>
      </form>
    );
  }
}

export default Register;
