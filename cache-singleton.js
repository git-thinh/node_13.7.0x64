var cacheSingleton = function cacheSingleton() {
    //#region [ VARIABLE ]
    const $ = this;

    const ___log = (...agrs) => console.log('CACHE: ', ...agrs);

    const _FS = require('fs');
    const _NET = require('net');
    _NET.bytesWritten = Number.MAX_SAFE_INTEGER;
    _NET.bufferSize = Number.MAX_SAFE_INTEGER;

    let on_ready = function () { };
    let on_busy = function () { };

    //#endregion

    //#region [ TCP_INIT ]

    let ADDRESS_PORT_INIT = { address: '127.0.0.1', port: 0 };
    let _TCP_INIT_BUF;

    const _TCP_INIT___on_message = function () {
        const _self = $;
        ___log('Raw = ', _TCP_INIT_BUF.length);

        const text = _TCP_INIT_BUF.toString('utf8');
        const json = JSON.parse(text);
        _self.CACHE_DATA_RAW = json;

        ___log('TCP_INIT ok ', json);
    };

    const _TCP_INIT = _NET.createServer((socket_) => {
        const _self = $;
        const chunks_ = [];
        _TCP_INIT_BUF = null;

        socket_.on('error', function (error) {
            console.log('Error : ', error);
            //Raise client distroy connection
        });

        socket_.on('data', chunk => chunks_.push(chunk));
        socket_.on('end', () => {
            _TCP_INIT_BUF = Buffer.concat(chunks_);
            // do what you want with it
            //___log('client disconnected = ', _TCP_INIT_BUF.length);
            setTimeout(function () { _TCP_INIT___on_message(); }, 1);

            //const text = buf.toString('utf8');
            //const json = buf.toJSON();
            //$.CACHE_DATA_RAW = json;

            //___log('TCP_INIT ok ');
        });

        //socket_.on('data', (data) => { 
        //    console.log(_NET.bufferSize, data.length);
        //    socket_.end();
        //});

        // c.write('hello\r\n');        

        //socket_.pipe(socket_);
    });
    _TCP_INIT.on('error', (err) => {
        //throw err;
    });

    //#endregion

    //#region [ TCP_UPDATE ]

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
        //throw err;
    });

    //#endregion

    //#region [ FUNCTIONS ]

    this.f_get___cache_setting = function () { return this.CACHE_SETTING; };
    this.f_set___cache_setting = (config_) => {
        //___log(config_);

        const _self = this;
        if (config_) {
            for (var key in config_) {
                switch (key) {
                    case 'valid': 
                    case 'caption': 
                    case 'plugin': 
                    case 'script': 
                    case 'connect_string': 
                    case 'join_1_1': 
                    case 'join_1_n': 
                    case 'full_text_search':
                        _self.CACHE_SETTING[key] = config_[key];
                        break;
                }

                switch (key) {
                    case 'valid':
                        break;
                    case 'caption':
                        break;
                    case 'plugin':
                        break;
                    case 'script':
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

    this.f_get___test = function (cache_name) {
        const _self = this;
        if (_self.CACHE_DATA_RAW[cache_name]) return _self.CACHE_DATA_RAW[cache_name];
        return [];
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

    //#endregion
};

cacheSingleton.instance = null;
cacheSingleton.getInstance = function () {
    if (this.instance === null) this.instance = new cacheSingleton();
    return this.instance;
};
module.exports = cacheSingleton.getInstance();