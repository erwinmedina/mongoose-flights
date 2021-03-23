const Flight = require('../models/flight');

module.exports = {
    create,
}

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        flight.destinations.push(req.body);
        flight.save(function(err) {
            console.log(flight, flight.destinations[0]);
            res.redirect(`/flights/${flight._id}`)
        })
    })
}