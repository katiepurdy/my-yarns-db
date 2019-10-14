const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const YarnSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    weight: { type: String, required: true },
    yardage: Number,
    grams: Number,
    gauge: String,
    needleSize: String,
    fibres: [String],
    colourways: [String],
    imagePath: String,
    machineWashable: Boolean
  },
  { _id: false }
);

module.exports = YarnSchema;
