const express = require('express');
const http = require('http');
const morgan = require('morgan');               // Morgan is used to log request details.
const bodyParser = require('body-parser');
const dishRouter = require('./router/dishRouter');
const promoRouter = require('./router/promoRouter');
const leaderRouter = require('./router/leaderRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());     //parses incoming data(request from the user) into JSON format.

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

app.use(express.static(__dirname + '/public'));     //__dirname provides full path of directory.

app.use((req, res, next) => {
console.log(req.headers);
res.statusCode = 200;
res.setHeader('Content-Type', 'text/html');
res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
console.log(`Server running at http://${hostname}:${port}/`);
});