const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const YarnSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 100 },
    brand: { type: String, required: true, minlength: 2, maxlength: 100 },
    weight: {
      type: String,
      required: true,
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
  },
  { _id: false }
);

module.exports = YarnSchema;
