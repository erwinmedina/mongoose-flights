const Flight = require('../models/flight');
const Ticket = require("../models/ticket")

module.exports = {
    index,
    show,
    new: newFlight,
    create,
    delete: deleteFlight,
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {flights});
    });
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: req.params.id}, function(err, tickets) {
            if (err) console.log(err);
            res.render('flights/show', {title: "Flights Details", flight});
        })
    })
}

function create(req, res) {
    if (req.body.departs === '') delete req.body.departs;
    
    Flight.create(req.body, function(err, flight) {
        if (err) console.log(err);
        res.redirect('/flights');
    })
}

function newFlight(req, res) {

    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', {departsDate});   
}

function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id, function(err, deletedFlight) {
        if (err) console.log(err)
    })
    res.redirect('/flights');
}