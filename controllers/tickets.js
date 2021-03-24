const Ticket = require('../models/ticket');
const Flight = require("../models/flight");

module.exports = {
    new: newTicket,
    create,
    addToFlight,
    delete: deleteTicket,
    update,
}

function create(req, res) {
    req.body.flight = req.params.id;
    Ticket.create(req.body, function(err, ticket) {
        res.redirect(`/flights/${req.params.id}`);
    })
}

function create(req, res) {
    Ticket.create(req.body, function(err, ticket) {
        res.redirect("/tickets/new");
    })
}

function addToFlight(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        flight.ticket.push(req.body.ticketId);
        flight.save(function(err) {
            console.log(flight, flight.ticket[0]);
            res.redirect("/flights/${flight._id");
        });
    });
}

function newTicket(req,res) {
    Ticket.find({}, function (err, tickets) {
        res.render("tickets/new", {
            title: 'Add Ticket Info',
            tickets
        });
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
        res.redirect(`/flights/${dleetedTicket.flight}`)
    })
}