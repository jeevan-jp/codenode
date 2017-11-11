const express = require('express');
const bodyParser =  require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.end('Will send all the dishes to you.');
})
.post((req, res, next) => {
    res.end('Will add dish ' + req.body.name + ' with datails: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;       //operation not supported.
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    res.end('Deleting all dishes');
});

module.exports = dishRouter;