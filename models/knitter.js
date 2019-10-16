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

module.exports = mongoose.model('Knitter', KnitterSchema);
