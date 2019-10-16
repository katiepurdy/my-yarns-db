const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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

const validateEmailAndPassword = user => {
  const userSchema = Joi.object({
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

// Authenticate input against database documents
UserSchema.statics.authenticate = function(email, password, callback) {
  this.findOne({ email: email }).exec((err, user) => {
    if (err) {
      return callback(err);
    } else if (!user) {
      const error = new Error('User not found');
      error.status = 401;
      return callback(error);
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};

// Hash password before saving to database
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

module.exports.User = mongoose.model('User', UserSchema);
module.exports.validateUser = validateUser;
module.exports.validateEmailAndPassword = validateEmailAndPassword;
