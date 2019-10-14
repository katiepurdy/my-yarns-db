const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const YarnSchema = require('./yarn');

const KnitterSchema = new Schema(
  {
    _id: { type: Schema.ObjectId, auto: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    yarns: [YarnSchema]
  },
  { versionKey: false }
);

module.exports = mongoose.model('Knitter', KnitterSchema);
