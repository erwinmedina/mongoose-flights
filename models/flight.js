const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema; 
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
             }}
        });
module.exports = mongoose.model('Flight', flightSchema);