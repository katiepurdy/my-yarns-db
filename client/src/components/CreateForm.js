import React from 'react';
import dataService from '../services/dataService';
import { Link } from 'react-router-dom';

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yarn: {
        name: '',
        brand: '',
        imagePath: ''
      },
      errors: {}
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    const clonedYarn = { ...this.state.yarn };
    clonedYarn[name] = value;
    this.setState({ yarn: clonedYarn });
  };

  handleSubmit = e => {
    e.preventDefault();
    const yarn = { ...this.state.yarn };
    dataService.createYarn(yarn, (err, response) => {
      if (err) console.log(err.data);
      return this.props.history.push('/');
    });
  };

  render() {
    return (
      <div className="container d-flex mt-5 w-100">
        <div className="mr-5 w-50">
          <h3>Add New Yarn</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="control-label " htmlFor="brand">
                <span className="asteriskField">*</span>Brand
              </label>
              <input
                className="form-control"
                id="brand"
                name="brand"
                type="text"
                onChange={this.handleChange}
                value={this.state.yarn.brand}
              />
            </div>
            <div className="form-group">
              <label className="control-label " htmlFor="name">
                <span className="asteriskField">*</span>Name
              </label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                onChange={this.handleChange}
                value={this.state.yarn.name}
              />
            </div>
            <div className="form-group">
              <label
                className="control-label requiredField"
                htmlFor="imagePath"
              >
                <span className="asteriskField">*</span>Image URL
              </label>
              <input
                className="form-control"
                id="imagePath"
                name="imagePath"
                type="text"
                onChange={this.handleChange}
                value={this.state.yarn.imagePath}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary mr-1"
                name="submit"
                type="submit"
              >
                Submit
              </button>
              <Link className="btn btn-secondary" to="/" name="cancel">
                Cancel
              </Link>
            </div>
          </form>
        </div>
        <div>
          {this.state.yarn.imagePath && (
            <img className="w-100" src={this.state.yarn.imagePath} />
          )}
        </div>
      </div>
    );
  }
}

export default CreateForm;
