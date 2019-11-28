import React from 'react';
import '../css/signin.css';
import auth from '../services/auth';

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

  handleSubmit = e => {
    e.preventDefault();
    auth.login(this.state.credentials, (err, resopnse) => {
      if (err) console.log(err);
      const { referrer } = this.props.location;
      return this.props.history.push(referrer ? referrer : '/');
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    const clonedCredentials = { ...this.state.credentials };
    clonedCredentials[name] = value;
    this.setState({ credentials: clonedCredentials });
  };

  render() {
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal text-center">
          Please sign in
        </h1>
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
