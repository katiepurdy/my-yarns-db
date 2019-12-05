import Joi from 'joi-browser';

class ValidationService {
  validate = (data, schema) => {
    const { error } = Joi.validate(data, schema, {
      abortEarly: false
    });
    if (!error) return null;
    const errors = {};
    error.details.forEach(detail => {
      if (!errors.hasOwnProperty(detail.path)) {
        errors[detail.path] = detail.message;
      }
    });
    return errors;
  };
}

export default new ValidationService();
