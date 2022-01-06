const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
  },
  arrival: {
    type: Date,
    default: function () {
      let result = new Date();
      result.setFullYear(result.getFullYear() + 1);
      return result;
    },
  },
});

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ["American", "Delta", "Southwest", "United"],
  },
  airport: {
    type: String,
    enum: ["ATL", "DFW", "DEN", "LAX", "SAN"],
    default: "DEN",
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    default: function () {
      let result = new Date();
      result.setFullYear(result.getFullYear() + 1);
      return result;
    },
  },

  destination: [destinationSchema],
});

module.exports = mongoose.model("Flight", flightSchema);
