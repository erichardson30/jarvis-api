var express = require('express');
var ObjectId = require('mongodb').ObjectID;

// Mongoose Schemas
var Schedules = require('./schedule.schema');

// API ROUTES
var apiRouter = express.Router();

apiRouter.get('/', function(req, res) {
    console.log("get all schedules");
    Schedules.find({}, function(err, schedules) {
        if(err) res.send(err);
        res.json(schedules);
    });
});

apiRouter.get('/now', function(req, res) {
    // var query = [
    //     { 'title': { $regex: new RegExp(req.params.input, "i") } },
    //     { 'tags': { $regex: new RegExp(req.params.input, "i") } },
    // ];
    // Template.find({ $or: query })
    //     .skip(req.query.skip)
    //     .limit(req.query.limit)
    //     .exec(function(err, results){
    //         if(err) res.send(err);
    //         res.json(results);
    //     });
});

apiRouter.post('/', function(req, res) {
    var schedule = new Schedules();
    console.log(req.body);
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

module.exports = apiRouter;
