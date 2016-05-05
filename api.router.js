var express = require('express');

// API ROUTES
var apiRouter = express.Router();

apiRouter.get('/', function(req, res) {
    res.json({message: "Welcome to the api"});
});

apiRouter.use('/schedules', require('./schedule/schedule.router'));

module.exports = apiRouter;
