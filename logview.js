var PORT = 2020;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('LOG listening on ' + address.address + ':' + address.port);
});

server.on('message', function (buf, remote) {
    const s = buf.toString('utf8');
    console.log('\n');
    console.log(s); 
});

server.bind(PORT, HOST);