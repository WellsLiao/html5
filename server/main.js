var PORT = 8090;

var http = require('http');
var url = require('url');
var fs = require('fs');
var mine = require('./mine').types;
var path = require('path');
var IP = require('./getLocalIP').ip;

var server = http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var realPath = path.join("../", pathname);
    //console.log(realPath);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function(exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function(err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
var addr = 'http://' + IP + ":" + PORT + "/index.html";
console.log("Server runing at port: " + PORT + ",open "+ addr);
var spawn = require('child_process').spawn;
spawn('open', [addr]);