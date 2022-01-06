const Flight = require("../models/flight");

module.exports = {
  create,
};

function create(req, res) {
  console.log(req.params.id);
  Flight.findById(req.params.id, function (err, flightDocument) {
    console.log("err:", err);
    console.log("body:", req.body);
    flightDocument.destination.push(req.body);
    flightDocument.save(function (err) {
      res.redirect(`/flights/${flightDocument._id}`);
    });
  });
}
