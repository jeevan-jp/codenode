const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.end('Will show details of all leaders');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation is not supported on /promotions');
})
.post((req, res, next) => {
    res.end('Will add promotion \'' + req.body.name + '\' with details: ' + req.body.description );
})
.delete((req, res, next) => {
    res.end('Deleting all promotions');
})

promoRouter.route('/:promoId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.statusCode = 200;
    res.end('Will send details of ' + req.params.promoId);
})
.put((req, res, next) => {
    res.write('Updating promotion ID: ' +  req.params.promoId );
    res.end('\nWill update promotion ' + req.body.name + ' with details ' + req.body.description );
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation is not supported on /promotions/' + req.params.promoId );
})
.delete((req, res, next) => {
    res.end('Deleting promotion ' + req.params.promoId);
})

module.exports = promoRouter;