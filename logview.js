const PORT = 2020;
const HOST = '127.0.0.1';

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const MSG = [];

server.on('listening', function () {
    var address = server.address();
    console.log('LOG listening on ' + address.address + ':' + address.port);
});

server.on('message', function (buf, remote) {
    if (buf.length == 1 && buf[0] == 126) // ~
        console.clear();
    else
        MSG.push(buf);
});

server.bind(PORT, HOST);

const ___print = function () {
    if (MSG.length == 0) {
        setTimeout(function () { ___print(); }, 500);
    } else {
        const buf = MSG.shift();

        const s = buf.toString('utf8');
        console.log('\n');

        const j = JSON.parse(s);
        const type = j.type;
        const scope = j.scope;
        const key = j.key;
        const time = j.time;
        const logs = j.log;

        if (logs.length == 1)
            console.log('* ', scope, key, logs[0]);
        else {
            console.log('* ', scope, key);
            logs.forEach(l => {
                //if (typeof l == 'string' || typeof l == 'number') {
                console.log('-> ', l);
                //} else {
                //    console.log('-> ' + JSON.stringify(l));
                //}
            });
        }

        setTimeout(function () { ___print(); }, 300);
    }
};
___print();