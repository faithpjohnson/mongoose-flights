const mongoose = require("mongoose");
const Schema = mongoose.Schema; // optional shortcut to the mongoose.Schema class

// this schema will be embedded in the flightSchema
// a destination belongs to a flight
const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
  },
  arrival: {
    type: Date,
  },
});

// defines what the "documents" aka the objects
// look like in our MongoDB Collection
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
    destination: [destinationSchema],
  },
});

// Compile the schema into a Model object and export it
module.exports = mongoose.model("Flight", flightSchema); // < this line creates the model
// It also creates 'movies' collection in mongoDB
// lowercase and plural of whatever our model name is
