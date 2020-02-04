var cacheSingleton = function cacheSingleton() {
    const ___log = (...agrs) => console.log('CACHE: ', ...agrs);

    const _FS = require('fs');
    const _NET = require('net');
    _NET.bytesWritten = Number.MAX_SAFE_INTEGER;
    _NET.bufferSize = Number.MAX_SAFE_INTEGER;
    //--------------------------------------------------------------------------------------------
    let on_ready = function () { };
    let on_busy = function () { };
     
    //--------------------------------------------------------------------------------------------
    let ADDRESS_PORT_INIT = { address: '127.0.0.1', port: 0 };

    const _TCP_INIT = _NET.createServer((socket_) => {
        const chunks_ = [];

        socket_.on('data', chunk => chunks_.push(chunk));
        socket_.on('end', () => {
            const file = Buffer.concat(chunks_);
            // do what you want with it

            console.log('client disconnected');
        });

        //socket_.on('data', (data) => { 
        //    console.log(_NET.bufferSize, data.length);
        //    socket_.end();
        //});

        // c.write('hello\r\n');        

        socket_.pipe(socket_);
    });
    _TCP_INIT.on('error', (err) => {
        throw err;
    });
    //--------------------------------------------------------------------------------------------
    let ADDRESS_PORT_UPDATE = { address: '127.0.0.1', port: 0 };

    const _TCP_UPDATE = _NET.createServer((socket_) => {
        const chunks_ = [];

        socket_.on('data', chunk => chunks_.push(chunk));
        socket_.on('end', () => {
            const file = Buffer.concat(chunks_);
            // do what you want with it

            console.log('client disconnected');
        });

        //socket_.on('data', (data) => { 
        //    console.log(_NET.bufferSize, data.length);
        //    socket_.end();
        //});

        // c.write('hello\r\n');        

        socket_.pipe(socket_);
    });
    _TCP_UPDATE.on('error', (err) => {
        throw err;
    });

    //--------------------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------------------
    this.f_get___cache_setting = function () { return this.CACHE_SETTING; };
    this.f_set___cache_setting = (config_) => {
        //___log(config_);

        const _self = this;
        if (config_) {
            for (var key in config_) {
                switch (key) {
                    case 'scripts': 
                    case 'connect_string': 
                    case 'join_1_1': 
                    case 'join_1_n': 
                    case 'full_text_search':
                        _self.CACHE_SETTING[key] = config_[key];
                        break;
                }

                switch (key) {
                    case 'scripts':
                        break;
                    case 'connect_string':
                        break;
                    case 'join_1_1':
                        break;
                    case 'join_1_n':
                        break;
                    case 'full_text_search':
                        break;
                }
            }
        }
        return _self.CACHE_SETTING;
    };

    this.f_start = function () {
        const _self = this;

        _TCP_INIT.listen(0, '127.0.0.1', () => {
            _self.ADDRESS_PORT_INIT = _TCP_INIT.address();
            console.log('TCP_CACHE_INIT: ', _self.ADDRESS_PORT_INIT);

            _TCP_UPDATE.listen(0, '127.0.0.1', () => {
                _self.ADDRESS_PORT_UPDATE = _TCP_UPDATE.address();
                console.log('TCP_CACHE_UPDATE: ', _self.ADDRESS_PORT_UPDATE);

                _self.on_ready(_self.ADDRESS_PORT_INIT, _self.ADDRESS_PORT_UPDATE);
            });
        });
    };

    //--------------------------------------------------------------------------------------------
};

cacheSingleton.instance = null;
cacheSingleton.getInstance = function () {
    if (this.instance === null) this.instance = new cacheSingleton();
    return this.instance;
};
module.exports = cacheSingleton.getInstance();