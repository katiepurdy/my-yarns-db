import React from 'react';
import dataService from '../services/dataService';
import validationService from '../services/validationService';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';

class EditForm extends React.Component {
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

  componentDidMount() {
    const id = this.props.match.params.id;
    dataService.getYarn(id, (err, yarn) => {
      if (err) return console.log(err);
      this.setState({ yarn });
    });
  }

  schema = {
    brand: Joi.string()
      .min(3)
      .max(50)
      .required()
      .label('Yarn brand'),
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
      .label('Yarn name'),
    imagePath: Joi.string()
      .required()
      .label('Yarn image'),
    weight: Joi.string().valid(
      'Thread',
      'Cobweb',
      'Lace',
      'Light fingering',
      'Fingering',
      'Sport',
      'DK',
      'Worsted',
      'Aran',
      'Bulky',
      'Super bulky',
      'Jumbo'
    ),
    grams: Joi.number()
      .integer()
      .min(10)
      .max(10000),
    yardage: Joi.number()
      .integer()
      .min(10)
      .max(100000),
    gauge: Joi.string()
      .min(10)
      .max(100),
    needleSize: Joi.string()
      .min(3)
      .max(50),
    fibres: Joi.array().items(
      Joi.string()
        .min(3)
        .max(50)
    ),
    colourways: Joi.array().items(
      Joi.string()
        .min(2)
        .max(50)
    ),
    machineWashable: Joi.bool()
  };

  handleSubmit = e => {
    e.preventDefault();
    delete this.state.yarn._id;
    const errors = validationService.validate(this.state.yarn, this.schema);
    this.setState({ errors: errors || {} });
    if (errors) return;
    const id = this.props.match.params.id;
    const yarn = { ...this.state.yarn };
    dataService.updateYarn(id, yarn, (err, response) => {
      if (err) {
        if (err.status === 400) {
          this.setState({ errors: { message: 'Something went wrong' } });
          return;
        }
        return console.log(err);
      }
      return this.props.history.push('/');
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    const clonedYarn = { ...this.state.yarn };
    clonedYarn[name] = value;
    this.setState({ yarn: clonedYarn, errors: {} });
  };

  render() {
    return (
      <div className="container d-flex mt-5 w-100">
        <div className="mr-5 w-50">
          <h3>Edit Yarn Details</h3>
          {Object.keys(this.state.errors).length > 0 &&
            Object.keys(this.state.errors).map((key, i) => {
              return (
                <div className="alert alert-danger" role="alert" key={i}>
                  {this.state.errors[key]}
                </div>
              );
            })}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="control-label " htmlFor="brand">
                Brand<span className="asteriskField">*</span>
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
                Name<span className="asteriskField">*</span>
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
                Image URL<span className="asteriskField">*</span>
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
                name="update"
                type="submit"
              >
                Update
              </button>
              <Link className="btn btn-secondary" to="/" name="cancel">
                Cancel
              </Link>
            </div>
          </form>
        </div>
        <div>
          {this.state.yarn.imagePath && (
            <img
              className="w-100"
              src={this.state.yarn.imagePath}
              alt="Preview"
            />
          )}
        </div>
      </div>
    );
  }
}

export default EditForm;
