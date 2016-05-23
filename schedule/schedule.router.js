var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var timezone = require('moment-timezone');
var mongoose = require('mongoose');

// Mongoose Schemas
var Schedules = require('./schedule.schema');

// API ROUTES
var apiRouter = express.Router();

// creates a new entry in the db
apiRouter.post('/', function(req, res) {
    console.log(req.body);
    var schedule = new Schedules();
    
    if(req.body.firstName) schedule.firstName = req.body.firstName;
    if(req.body.real_name) schedule.real_name = req.body.real_name;
    if(req.body.userName) schedule.userName = req.body.userName;
    if(req.body.email) schedule.email = req.body.email;
    if(req.body.userId) schedule.userId = req.body.userId;
    if(req.body.date) schedule.date = req.body.date;
    if(req.body.channel) schedule.channel = req.body.channel;
    if(req.body.expecting) schedule.expecting = req.body.expecting;
    if(req.body.checkedIn !== null) schedule.checkedIn = req.body.checkedIn;
    if(req.body.checkedInDate) schedule.checkedInDate = req.body.checkedInDate;
    
    schedule.save(function(err, schedule) {
        if (err) res.send(err);
        res.json({message: 'Schedule was created'});
    });
});

// gets all entries in the db 
apiRouter.get('/', function(req, res) {
    console.log("get all schedules");
    Schedules.find({}, function(err, schedules) {
        if(err) res.send(err);
        res.json(schedules);
    });
});

// gets all records within a 15 min window for everyone that is not checked in 
apiRouter.get('/now', function(req, res) {
    var later = timezone.tz('America/New_York').add(45, 'm').toDate();
    var earlier = timezone.tz('America/New_York').subtract(45, 'm').toDate();
    
     Schedules.find({
         'date': {
            '$gt': earlier,
            '$lt': later
         },
         'checkedIn' : 'false'
     }, function(err, schedules) {
        if(err) res.send(err);
        res.json(schedules);
    });
});

// deletes all db entries after a week
apiRouter.delete('/', function(req, res) {
    var earlier = timezone.tz('America/New_York').subtract(7, 'd').toDate();
    
     Schedules.remove({
         'date': {
            '$lt': earlier
         }
     }, function(err, schedules) {
        if(err) res.send(err);
        res.json({message : "Old entries deleted"});
    });
});

apiRouter.put('/checkedin/:id', function( req, res) {
    Schedules.findById(mongoose.Types.ObjectID(req.params.id), function(err, schedule) {
        if(err) res.send(err);
        
        schedule = new Schedules();
        
        schedule.checkedIn = true;
        schedule.checkedInDate = timezone.tz('America/New_York').toDate();
        
        schedule.save(function(err, schedule) {
            if(err) res.send(err);
            res.send({message: "Checked in!"});
        })
    })
});

apiRouter.get('/list', function(req, res) {
    var query = {};
   if(req.query.date) {
       var date = timezone.tz(req.query.date, 'America/New_York');
       query = {'date' : { '$gte' : date }};
   } else {
       var date = timezone.tz('America/New_York').hour(0).minute(0).toDate();
       query = {'date' : { '$gte': date }}
   }
   
   Schedules.find(query, function(err, schedules) {
        if(err) res.send(err);
        res.json(schedules);
    });
});

module.exports = apiRouter;
