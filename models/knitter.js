const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const YarnSchema = require('./yarn');

const KnitterSchema = new Schema({
  firstName: { type: String, required: true, minlength: 2, maxlength: 100 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true },
  yarns: [YarnSchema]
});

const validateKnitter = knitter => {
  const yarnSchema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    brand: Joi.string()
      .min(3)
      .max(50)
      .required(),
    weight: Joi.string()
      .valid(
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
      )
      .required(),
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
    imagePath: Joi.string()
      .min(5)
      .max(300),
    machineWashable: Joi.bool()
  });

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
      .required(),
    yarns: Joi.array().items(yarnSchema)
  });

  return knitterSchema.validate(knitter);
};

module.exports = mongoose.model('Knitter', KnitterSchema);
module.exports.validate = validateKnitter;
