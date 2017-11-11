const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port  = 3000;

const server = http.createServer((req, res) => {
    console.log('result for ' + req.url + ' by method ' + req.method);

    if(req.method == 'GET') {
        var fileurl;
        if(req.url == '/') fileurl = '/index.html';
        else fileurl = req.url;

        var filepath = path.resolve('./public' + fileurl);
        var pathext = path.extname(filepath);   
        if(pathext == '.html') {                    
            fs.exists(filepath, (exists) => {
                if(!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-type', 'text/html');
                    res.end('<html><body><h1>Error 404: ' + fileurl + 
                                ' not found</h1></body></html>');
                    return;
                }
                else {
                    res.statusCode = 200;
                    res.setHeader('Content.type', 'text/html');
                    fs.createReadStream(filepath).pipe(res);
                }
            })
        }
        else {
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileurl + 
                        ' not found</h1></body></html>');
            return;
        }
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method + ' not supported</h1></body></html>')
    }
})

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
})