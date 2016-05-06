var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var moment = require('moment');

// Mongoose Schemas
var Schedules = require('./schedule.schema');

// API ROUTES
var apiRouter = express.Router();

apiRouter.post('/', function(req, res) {
    console.log(req.body);
    var schedule = new Schedules();
    
    schedule.firstName = req.body.firstName;
    schedule.real_name = req.body.real_name;
    schedule.userName = req.body.userName;
    schedule.email = req.body.email;
    schedule.userId = req.body.userId;
    schedule.date = req.body.date;
    schedule.channel = req.body.channel;
    schedule.expecting = req.body.expecting;
    
    schedule.save(function(err, schedule) {
        if (err) res.send(err);
        res.json({message: 'Schedule was created'});
    });
});

apiRouter.get('/', function(req, res) {
    console.log("get all schedules");
    Schedules.find({}, function(err, schedules) {
        if(err) res.send(err);
        res.json(schedules);
    });
});

apiRouter.get('/now', function(req, res) {
    var later = moment().local().add(15, 'm').toDate();
    var earlier = moment().local().subtract(15, 'm').toDate();
    
     Schedules.find({
         'date': {
            '$gt': earlier,
            '$lt': later
         }
     }, function(err, schedules) {
        if(err) res.send(err);
        res.json(schedules);
    });
});

module.exports = apiRouter;
