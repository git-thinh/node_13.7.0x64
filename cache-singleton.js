var cacheSingleton = function cacheSingleton() {
    const PORT = 1000;
    const $ = this;

    //#region [ LOG ]

    const ___yyyyMMddHHmmss = () => new Date().toISOString().slice(-24).replace(/\D/g, '').slice(0, 8) + '_' + new Date().toTimeString().split(' ')[0].replace(/\D/g, '');

    const ___log = (...agrs) => console.log('CACHE: ', ...agrs);
    const ___log_tcp_init = (...agrs) => console.log('TCP_INIT: ', ...agrs);
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

        //___log_tcp_init('Begin connect at ' + new Date().toLocaleString());

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
                //___log_tcp_init('BUFFER RECEIVE OK: ', TCP_INIT_BUF_TOTAL);
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

    const ___convert_unicode_to_ascii = function (str) {
        if (str == null || str.length == 0) return '';
        str = str.trim();
        if (str.length == 0) return '';

        var AccentsMap = [
            "aàảãáạăằẳẵắặâầẩẫấậ",
            "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
            "dđ", "DĐ",
            "eèẻẽéẹêềểễếệ",
            "EÈẺẼÉẸÊỀỂỄẾỆ",
            "iìỉĩíị",
            "IÌỈĨÍỊ",
            "oòỏõóọôồổỗốộơờởỡớợ",
            "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
            "uùủũúụưừửữứự",
            "UÙỦŨÚỤƯỪỬỮỨỰ",
            "yỳỷỹýỵ",
            "YỲỶỸÝỴ"
        ];
        for (var i = 0; i < AccentsMap.length; i++) {
            var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
            var char = AccentsMap[i][0];
            str = str.replace(re, char);
        }

        str = str
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");

        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        str = str.replace(/ + /g, " ");

        str = str.toLowerCase();

        return str;
    };

    this.f_cache___index_reset_all = function () {
        ___log_index('Start ... ' + new Date().toLocaleString());

        const setting = $.CACHE_SETTING;
        const master_name = setting.master_name;
        const full_text_search = setting.full_text_search;
        //const full_text_search = { USER: setting.full_text_search['USER'] };
        const raw = $.CACHE_DATA_RAW;
        const ext = $.CACHE_DATA_EXT;
        const inx = $.CACHE_INDEX;

        if (raw && ext) {
            let i = 0, r, cf, a = [], ex = [], x;

            const cache_names = _.filter(Object.keys(full_text_search), function (o_) { return o_ != master_name; });
            if (master_name) cache_names.push(master_name);

            cache_names.forEach((cache_name) => {
                inx[cache_name] = {};
                cf = full_text_search[cache_name];
                a = raw[cache_name];
                ex = [];

                if (cf && a && a.length > 0) {
                    let join_1_1, join_1_n, col_11 = [], api_11 = [], alias_11 = [];
                    let has_join_11 = false;

                    if (master_name && cache_name == master_name) {
                        if (setting.join_1_1) join_1_1 = setting.join_1_1[master_name];
                        if (setting.join_1_n) join_1_n = setting.join_1_n[master_name];
                        if (join_1_1) {
                            col_11 = Object.keys(join_1_1);
                            api_11 = Object.values(join_1_1).map((o_) => { return o_.name; });
                            alias_11 = Object.values(join_1_1).map((o_) => { return o_.alias; });
                            has_join_11 = col_11.length == api_11.length == alias_11.length;
                        }
                    }

                    let c_ids = [], c_ascii = [], c_utf8 = [], c_org = [];
                    let ids, ascii, utf8, org;

                    if (cf.ids) c_ids = _.filter(cf.ids.split(','), function (o_) { return o_.length > 0; });
                    if (cf.ascii) c_ascii = _.filter(cf.ascii.split(','), function (o_) { return o_.length > 0; });
                    if (cf.utf8) c_utf8 = _.filter(cf.utf8.split(','), function (o_) { return o_.length > 0; });
                    if (cf.org) c_org = _.filter(cf.org.split(','), function (o_) { return o_.length > 0; });

                    for (i = 0; i < a.length; i++) {
                        r = a[i];
                        r.___i = i;

                        x = { ___i: i, id: r.id };

                        ids = (_.map(c_ids, function (c_) { return r[c_]; })).join(' ').trim();
                        ascii = (_.map(c_ascii, function (c_) { return r[c_]; })).join(' ').trim();
                        utf8 = (_.map(c_utf8, function (c_) { return r[c_]; })).join(' ').trim();
                        org = (_.map(c_org, function (c_) { return r[c_]; })).join(' ').trim();

                        if (cache_name == master_name) {
                            if (has_join_11) {
                                col_11.map((c_, i_) => {
                                    if (r[c_]) x[alias_11[i_]] = inx[api_11[i_]][r[c_]];
                                });
                            }
                        }

                        if (ids && ids.length > 0) ids = ' ' + ids + ' ';
                        if (ascii && ascii.length > 0) ascii = ' ' + ___convert_unicode_to_ascii(ascii) + ' ';
                        if (utf8 && utf8.length > 0) utf8 = ' ' + utf8.toLowerCase().replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ").replace(/ + /g, " ") + ' ';
                        if (org && org.length > 0) org = ' ' + org + ' ';

                        x.ids = ids;
                        x.ascii = ascii;
                        x.utf8 = utf8;
                        x.org = org;

                        ex.push(x);
                        inx[cache_name][r.id] = r;
                    }

                    ext[cache_name] = ex;
                }
            });

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