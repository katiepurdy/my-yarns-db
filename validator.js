const Joi = require('@hapi/joi');

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
      .min(2)
      .max(25)
      .required(),
    grams: Joi.number()
      .integer()
      .min(10)
      .max(1000),
    yardage: Joi.number()
      .integer()
      .min(10)
      .max(1000),
    gauge: Joi.string()
      .min(3)
      .max(50),
    needleSize: Joi.string()
      .min(3)
      .max(50),
    fibres: Joi.array().items(
      Joi.string()
        .min(3)
        .max(50)
    ),
    colourways: Joi.array().items(Joi.string()),
    imagePath: Joi.string()
      .min(3)
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

module.exports.validateKnitter = validateKnitter;
