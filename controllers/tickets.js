const res = require("express/lib/response");
const Flight = require("../models/ticket");
const Ticket = require("../models/ticket");

module.exports = {
  create,
  newTicket,
};

function create(req, res) {
  console.log(req.body);
  Ticket.create(req.body, function (err, ticketDocument) {
    console.log(ticketDocument);
  });
  res.redirect(`flights/${req.body.flight}`);
}

function newTicket(req, res) {
  res.render("tickets/new", {
    title: "Create a Ticket",
    flightID: req.params.id,
  });
}
