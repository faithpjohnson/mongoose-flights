const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
  new: newFlight,
  create,
  index,
  show,
};

function newFlight(req, res) {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  now.setFullYear(now.getFullYear() + 1);

  res.render("flights/new", {
    currentTime: now.toISOString().slice(0, -1),
    title: "Enter a Flight",
  });
}

function index(req, res) {
  Flight.find({}, function (err, flightDocuments) {
    res.render("flights/index", {
      flights: flightDocuments,
      title: "Flights",
    });
  });
}

function show(req, res) {
  console.log("ID:", req.params.id);

  Flight.findById(req.params.id, function (err, flightDocuments) {
    Ticket.find({ flight: req.params.id }, function (err, ticketDocuments) {
      console.log(flightDocuments);
      res.render("flights/show", {
        flight: flightDocuments,
        title: "Flight Details",
        tickets: ticketDocuments,
      });
    });
  });
}

function create(req, res) {
  Flight.create(req.body, function (err, flightDocument) {
    console.log(flightDocument, "<flightDocument");
    console.log(err);
    res.redirect("/flights");
  });
}
