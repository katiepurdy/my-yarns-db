const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KnitterSchema = new Schema({
  firstName: { type: String, required: true, minlength: 2, maxlength: 100 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true }
});

const validateKnitter = knitter => {
  const knitterSchema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(30)
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .required()
  });

  return knitterSchema.validate(knitter);
};

module.exports.Knitter = mongoose.model('Knitter', KnitterSchema);
module.exports.validate = validateKnitter;
