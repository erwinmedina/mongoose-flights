const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const destinationSchema = new Schema (
    {
        airport: {
            type: String,
            enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        },
        arrival: Date,
    
    }, {
        timestamps: true
    }
)

const flightSchema = new Schema (
    {
        property: String,
        flightNo: Number,
        airport : String,
        departs : {
            type    : Date, 
            default : function() {
                const current = new Date();
                const date = current.setFullYear(current.getFullYear() + 1);
                return date;
             }},
        destinations: [destinationSchema]
    }, {
        timestamps: true
    });

module.exports = mongoose.model('Flight', flightSchema);