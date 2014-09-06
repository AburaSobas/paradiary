var http = require('http');
var fs = require('fs');

var server = http.createServer();
server.on('request', function (request, response) {
    fs.readFile('../main.htm', 'UTF-8', function(err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(data);  // uHello, world!v‚©‚ç•ÏX
    });
//    response.writeHead(200);
//    response.write('URL: ' + request.url + '\n');
//    response.write('Method: ' + request.method + '\n');
//    Object.keys(request.headers).forEach(function (key) {
//        response.write(key + ': ' + request.headers[key] + '\n');
//    });
//    response.end();
});

server.listen(8080, '127.0.0.1');