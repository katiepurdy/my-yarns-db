import React from 'react';
import '../css/register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.headers.get('x-auth-token')) {
        localStorage.setItem(
          'x-auth-token',
          response.headers.get('x-auth-token')
        );
        return this.props.history.push('/');
      }
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form className="form-register" onSubmit={this.handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal text-center">
          Please register
        </h1>
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
            placeholder="Confirm Password"
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
