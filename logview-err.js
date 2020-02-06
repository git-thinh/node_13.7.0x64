var PORT = 2121;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('LOG ERRORS listening on ' + address.address + ':' + address.port);
});

server.on('message', function (buf, remote) {
    const s = buf.toString('utf8');
    console.log('\n');
    console.log(s); 
});

server.bind(PORT, HOST);