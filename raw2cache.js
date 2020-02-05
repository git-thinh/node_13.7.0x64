const fs = require('fs');
const _JOB = require('cron').CronJob;

const net = require('net');
net.bufferSize = Number.MAX_SAFE_INTEGER;
net.bytesRead = Number.MAX_SAFE_INTEGER;

const client = net.connect({ port: 49773, address: '127.0.0.1' }, () => {
    // 'connect' listener
    console.log('connected to server!');

    fs.readFile('raw.txt', 'utf8', (err, data) => {
        if (!err) {
            console.log(data.length);
            client.write(data);
            //client.write('world!\r\n');
        }
        else {
            console.log('readfile err');
        }
    });
});

//client.on('data', (data) => {
//    // console.log(data.toString());
//    console.log(net.bufferSize, data.length);
//    client.end();
//});

client.on('end', () => {
    console.log('disconnected from server');
});

new _JOB('* * * * * *', function () {
    //console.log(new Date());    
}).start();