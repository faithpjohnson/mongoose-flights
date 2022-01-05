const Flight = require("../models/flight");

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
  });
}

function index(req, res) {
  // find every document
  // return an array of objects
  Flight.find({}, function (err, flightDocuments) {
    res.render("flights/index", {
      // flights represents the key, is the name of the variable we are injecting
      // into flights/index
      // flightDocs represents each of the docs within the model- array of objects
      flights: flightDocuments,
    });
  });
}

function show(req, res) {
  //TODO: this needs to show the specific flight at :id from the route
  Flight.find({}, function (err, flightDocuments) {
    console.log(flightDocuments);
    res.render("flights/show", {
      flight: flightDocuments,
    });
  });
}

function create(req, res) {
  // log to see the contents of the form
  // console.log(req.body, "<-req.body in the create function in my MOviesCtrl");
  // res.send('the create route is being it');
  console.log(req.body);

  // re.body is the contents of the form, thats what we want to save in the database
  // Model is talking to the database
  // Model is talking to MongoDB here
  // Asking to create this doc (aka req.bdoy is the doc we want to create)
  Flight.create(req.body, function (err, flightDocument) {
    console.log(flightDocument, "<flightDocument");
    console.log(err);
    // after the db responds
    // then we respond to the client
    // res.send('the create route is working!');
    res.redirect("/flights");
  });
}
