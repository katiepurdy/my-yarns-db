const Joi = require('@hapi/joi');

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

module.exports.validateUser = validateUser;
module.exports.validateKnitter = validateKnitter;
