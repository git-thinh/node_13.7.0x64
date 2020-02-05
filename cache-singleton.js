var cacheSingleton = function cacheSingleton() {
    const PORT = 1000;
    const $ = this;

    //#region [ LOG ]
    const ___yyyyMMddHHmmss = () => new Date().toISOString().slice(-24).replace(/\D/g, '').slice(0, 8) + '_' + new Date().toTimeString().split(' ')[0].replace(/\D/g, '');

    const ___log = (...agrs) => console.log('CACHE: ', ...agrs);
    const ___log_tcp_init = (...agrs) => { }; //console.log('TCP_INIT: ', ...agrs);
    const ___log_index = (...agrs) => console.log('INDEX: ', ...agrs);

    //#endregion

    //#region [ VARIABLE ]

    const _ = require('lodash');

    const _FS = require('fs');
    const _NET = require('net');
    _NET.bytesWritten = Number.MAX_SAFE_INTEGER;
    _NET.bufferSize = Number.MAX_SAFE_INTEGER;

    let on_ready_shared = function (add_port_init, add_port_update) { };
    let on_busy_shared = function () { };

    //#endregion

    //#region [ TCP_INIT ]

    let TCP_INIT_BUF_CONNECT_COUNTER = 0;
    let TCP_INIT_BUF_RECEIVE_COUNTER = 0;
    let TCP_INIT_BUF_TOTAL = 0;

    const _TCP_INIT___on_buffering = function (buf) {
        TCP_INIT_BUF_RECEIVE_COUNTER++;

        $.STATE = 'CACHE_BUFFER';

        const text = buf.toString('utf8');
        const json = JSON.parse(text);
        const a = [];
        for (var cache_name in json) {
            a.push(cache_name);
            $.CACHE_DATA_RAW[cache_name] = json[cache_name];
        }

        ___log_tcp_init('Receive buffer: ' + a.join(', ') + ' Size = ' + buf.length + ' at ' + new Date().toLocaleString() + ' | ', TCP_INIT_BUF_RECEIVE_COUNTER, TCP_INIT_BUF_TOTAL);

        if (TCP_INIT_BUF_TOTAL == TCP_INIT_BUF_RECEIVE_COUNTER) _TCP_INIT___on_done();
    };

    const _TCP_INIT___on_done = function (buf) {
        TCP_INIT_BUF_TOTAL = 0;
        TCP_INIT_BUF_CONNECT_COUNTER = 0;
        TCP_INIT_BUF_RECEIVE_COUNTER = 0;

        $.STATE = 'CACHE_INDEX';

        $.f_cache___index_reset_all();

        $.IS_BUSY = false;
    };

    const _TCP_INIT = _NET.createServer((socket_) => {
        TCP_INIT_BUF_CONNECT_COUNTER++;

        $.IS_BUSY = true;
        $.STATE = 'CACHE_BUFFER';

        const chunks_ = [];
        let last_ = [];

        ___log_tcp_init('Begin connect at ' + new Date().toLocaleString());

        socket_.on('error', function (error) {
            $.IS_BUSY = false;
        });
        socket_.on('data', chunk => {
            last_ = chunk;
            chunks_.push(chunk);
        });

        socket_.on('end', () => {
            let done = false;

            if (last_.length == 2)
                if (last_.toString() == 'OK')
                    done = true;

            if (done) {
                TCP_INIT_BUF_TOTAL = TCP_INIT_BUF_CONNECT_COUNTER - 1;
                ___log_tcp_init('BUFFER RECEIVE OK: ', TCP_INIT_BUF_TOTAL);
                socket_.end();
            } else {
                const buf = Buffer.concat(chunks_);
                setTimeout(function (o) {
                    _TCP_INIT___on_buffering(o);
                }, 1, buf);
            }
        });
    });
    _TCP_INIT.on('error', (err) => {
        $.IS_BUSY = false;
    });

    //#endregion

    //#region [ TCP_UPDATE ]

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

    //#region [ IS_BUSY, STATE, ON_READY, F_START ... ]

    this.IS_BUSY = false;
    this.STATE = 'NONE';

    const on_ready = function (add_port_init, add_port_update) {
        $.on_ready_shared(add_port_init, add_port_update);
    };
    this.on_busy = function (state_) {
        this.IS_BUSY = true;
        this.STATE = state_;
        if ($.on_busy_shared) setTimeout(function () { $.on_busy_shared(); }, 1);
    };

    this.f_start = function () {
        _TCP_INIT.listen(PORT, '127.0.0.1', () => {
            $.ADDRESS_PORT_INIT = _TCP_INIT.address();
            console.log('TCP_CACHE_INIT: ', $.ADDRESS_PORT_INIT);

            _TCP_UPDATE.listen(0, '127.0.0.1', () => {
                $.ADDRESS_PORT_UPDATE = _TCP_UPDATE.address();
                console.log('TCP_CACHE_UPDATE: ', $.ADDRESS_PORT_UPDATE);

                on_ready($.ADDRESS_PORT_INIT, $.ADDRESS_PORT_UPDATE);
            });
        });
    };

    //#endregion

    //#region [ CACHE SETTING ]

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

    //#endregion

    //#region [ TEST ]

    this.f_get___test = function (type, cache_name) {
        const is_raw = type && type.toUpperCase() == 'RAW';

        let a = [];
        if (is_raw && $.CACHE_DATA_RAW[cache_name])
            a = $.CACHE_DATA_RAW[cache_name];
        else if ($.CACHE_DATA_EXT[cache_name])
            a = $.CACHE_DATA_EXT[cache_name];

        if (a.length > 0)
            a = _.filter(a, function (o_, i_) { return i_ < 10; });

        return a;
    };

    //#endregion

    //#region [ INDEX ]

    this.f_cache___index_reset_all = function () {
        ___log_index('Start ... ' + new Date().toLocaleString());

        const master_name = $.CACHE_SETTING.master_name;
        const full_text_search = $.CACHE_SETTING.full_text_search;
        const raw = $.CACHE_DATA_RAW;
        const ext = $.CACHE_DATA_EXT;

        if (raw && ext) {
            let i = 0, r, cf, a = [], ex = [], x;

            for (var cache_name in full_text_search) {
                cf = full_text_search[cache_name];
                a = raw[cache_name];
                ex = [];

                if (cache_name != master_name && a && cf) {
                    for (i = 0; i < a.length; i++) {
                        r = a[i];
                        x = {
                            ___i: r.___i,
                            id: r.id,

                            ids: '',
                            ascii: '',
                            utf8: '',
                            org: ''
                        };

                        ex.push(x);
                    }

                    ext[cache_name] = ex;
                }
            }
        }

        ___log_index('Complete at ' + new Date().toLocaleString());
    };

    //#endregion
};

cacheSingleton.instance = null;
cacheSingleton.getInstance = function () {
    if (this.instance === null) this.instance = new cacheSingleton();
    return this.instance;
};
module.exports = cacheSingleton.getInstance();