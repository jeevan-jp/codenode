const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.end('Will show details of all the leaders.');
})
.post((req, res, next) => {
    res.end('Will add leader ' + req.body.name + ' with datails: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;       //operation not supported.
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    res.end('Deleting all leaders');
});

leaderRouter.route('/:leaderId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.statusCode = 200;
    res.end('Will send details of leader ' + req.params.leaderId);
})
.put((req, res, next) => {
    res.write('Updating leader ID: ' +  req.params.leaderId );
    res.end('\nWill update leader ' + req.body.name + ' with details ' + req.body.description );
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation is not supported on /leaders/' + req.params.leaderId );
})
.delete((req, res, next) => {
    res.end('Deleting Leader ' + req.params.leaderId);
});

module.exports = leaderRouter;