const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const YarnsSchema = new Schema({
  name: String,
  brand: String,
  weight: String,
  yardage: Number,
  grams: Number,
  gauge: String,
  needleSize: String,
  fibres: [String],
  colourways: [String],
  imagePath: String,
  machineWashable: Boolean
});

const knitterSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  yarns: [YarnsSchema]
});

module.exports = mongoose.model('Knitter', knitterSchema);
