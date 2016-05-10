var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScheduleSchema = new Schema({
    firstName : String,
    real_name : String,
    userName : String,
    email : String,
    userId : String,
    date : Date,
    channel: String,
    expecting : {
        name : String,
        checkedIn : Boolean,
        checkedInDate : Date
    }
});

// Return the model
module.exports = mongoose.model('Schedules', ScheduleSchema);
