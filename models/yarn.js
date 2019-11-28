const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');

const YarnSchema = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 100 },
  brand: { type: String, required: true, minlength: 2, maxlength: 100 },
  weight: {
    type: String,
    enum: [
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
    ]
  },
  yardage: { type: Number, min: 10, max: 10000 },
  grams: { type: Number, min: 10, max: 10000 },
  gauge: { type: String, minlength: 10, maxlength: 100 },
  needleSize: { type: String, minlength: 10, maxlength: 100 },
  fibres: [String],
  colourways: [String],
  imagePath: { type: String, minlength: 5, maxlength: 300 },
  machineWashable: Boolean
});

const validateYarn = yarn => {
  const yarnSchema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    brand: Joi.string()
      .min(3)
      .max(50)
      .required(),
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
    imagePath: Joi.string()
      .min(5)
      .max(300),
    machineWashable: Joi.bool()
  });

  return yarnSchema.validate(yarn);
};

module.exports.Yarn = mongoose.model('Yarn', YarnSchema);
module.exports.validate = validateYarn;
