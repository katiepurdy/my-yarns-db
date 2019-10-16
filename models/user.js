const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true, minlength: 2, maxlength: 100 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8, maxlength: 255 }
});

const validateUser = user => {
  const userSchema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(100)
      .required(),
    lastName: Joi.string()
      .min(2)
      .max(100)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .max(255)
      .required()
  });

  return userSchema.validate(user);
};

module.exports = mongoose.model('User', UserSchema);
module.exports.validate = validateUser;
