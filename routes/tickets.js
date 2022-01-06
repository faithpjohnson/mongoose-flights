const express = require("express");
const router = express.Router();
const ticketsCtrl = require("../controllers/tickets");

router.post("/tickets", ticketsCtrl.create);
router.get("/flights/:id/tickets/new", ticketsCtrl.newTicket);

module.exports = router;
