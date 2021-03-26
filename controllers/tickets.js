const Ticket = require('../models/ticket');
const Flight = require("../models/flight");

module.exports = {
    create,
    update,
    delete: deleteTicket,
    new: newTicket,
}

function create(req, res) {
    req.body.flight = req.params.id;
    Ticket.create(req.body, function(err, ticket) {
        res.redirect(`/flights/${req.params.id}`)
    })
  }

function update(req, res) {
    Ticket.findById(req.params.id, function(err, ticket) {
        Object.assign(ticket, req.body);
        ticket.save(function(err) {
            res.redirect(`/flights/${ticket.flight}`);
        })
    })
}

function deleteTicket(req, res) {
    Ticket.findByIdAndDelete(req.params.id, function(err, deletedTicket) {
        res.redirect(`/flights/${deletedTicket.flight}`)
    })
}

function newTicket(req,res) {
    Ticket.find({}, function(err, tickets) {
        res.render("tickets/new", {
            title: 'Add Ticket',
            flightId: req.params.id
        });
    })
}