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
        res.json(templates);
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

module.exports = apiRouter;
