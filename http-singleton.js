let httpSingleton = function httpSingleton() {
    //#region [ VARIABLE ]

    const $ = this;
    const PORT = 12345;

    const SCOPE = 'API';
    const ___log = (...agrs) => { if ($.LOG) $.LOG.f_write('INFO', SCOPE, '', ...agrs); }
    const ___log_key = (key, ...agrs) => { if ($.LOG) $.LOG.f_write('INFO', SCOPE, key, ...agrs); }
    const ___log_error = (key, ...agrs) => { if ($.LOG) $.LOG.f_write('ERR', SCOPE, key, ...agrs); } 
    
    const ___guid = function () {
        return 'id-xxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    //#endregion

    //#region [ API SETUP ]

    const _PATH = require('path');
    const _HTTP_EXPRESS = require('express');
    const _HTTP_BODY_PARSER = require('body-parser');
    const _HTTP_APP = _HTTP_EXPRESS();

    const _HTTP_SERVER = require('http').createServer(_HTTP_APP);
    const _IO = require('socket.io')(_HTTP_SERVER);

    //--------------------------------------------------------------------------------------------    
    //_HTTP_APP.use(_HTTP_EXPRESS.static(_PATH.join(__dirname, 'htdocs')));

    _HTTP_APP.use(_HTTP_BODY_PARSER.json());
    _HTTP_APP.use((error, req, res, next) => {
        if ($.CACHE_STORE.IS_BUSY) {
            return res.json({ ok: false, state: $.CACHE_STORE.STATE, mesage: 'Api is caching ...' });
        }
        if (error !== null) {
            return res.json({ ok: false, mesage: 'Invalid json ' + error.toString() });
        }
        return next();
    });

    //#endregion

    //#region [ / ]

    _HTTP_APP.get('/', function (req, res) {
        res.json($.INFO);
    });

    //#endregion

    //#region [ TEST ]

    _HTTP_APP.get('/test-log', function (req, res) {
        const s = $.INFO.APP_NAME + ' Test LOG at ' + new Date().toLocaleString();
        $.LOG.info(s);
        res.json({ ok: true, message: s });
    });

    //#endregion

    //#region [ LOG ]

    _HTTP_APP.get('/log', function (req, res) {
        const log = $.LOG.f_get_all();
        res.json(log);
    });

    //--------------------------------------------------

    _HTTP_APP.get('/log/keys', function (req, res) {
        const log = $.LOG.f_get_keys();
        res.json(log);
    });

    _HTTP_APP.get('/log/scopes', function (req, res) {
        const log = $.LOG.f_get_scopes();
        res.json(log);
    });

    //--------------------------------------------------

    _HTTP_APP.get('/log/clear', function (req, res) {
        const log = $.LOG.f_clear();
        res.json(log);
    });

    _HTTP_APP.get('/log/setting', function (req, res) {
        const log = $.CACHE_SETTING.log;
        if (log) res.json(log);
        else res.json({});
    });
     
    //--------------------------------------------------

    _HTTP_APP.get('/log/filter/scope/:scope', function (req, res) {
        const value = req.params.scope;
        if (value) {
            const a = $.LOG.f_filter('scope', value);
            res.json(log);
        } else
            res.json([]);
    });

    _HTTP_APP.get('/log/filter/key/:key', function (req, res) {
        const value = req.params.key;
        if (value) {
            const a = $.LOG.f_filter('key', value);
            res.json(a);
        } else
            res.json([]);
    });

    //--------------------------------------------------

    //#endregion

    //#region [ /view-data/ raw | ext ]
    
    _HTTP_APP.get('/view-data/raw/:cache_name', function (req, res) {
        const api = req.params.cache_name;
        let a = [];
        if (api) a = $.CACHE_STORE.f_get___test('RAW', api.toUpperCase());
        res.json(a);
    });
    _HTTP_APP.get('/view-data/ext/:cache_name', function (req, res) {
        const api = req.params.cache_name;
        let a = [];
        if (api) a = $.CACHE_STORE.f_get___test('EXT', api.toUpperCase());
        res.json(a);
    });

    //#endregion

    //#region [ /cache-setting ]
    
    _HTTP_APP.get('/cache-setting', function (req, res) {

        const val = $.CACHE_STORE.f_get___cache_setting();
        //___log(val);

        res.json(val);
    });

    _HTTP_APP.post('/cache-setting', function (req, res) {
        const m_ = req.body; 
        $.CACHE_STORE.f_set___cache_setting(m_); 
        res.json($.CACHE_STORE.f_get___cache_setting());
    });

    //#endregion

    //#region [ /cache-index ]



    //#endregion
    
    //#region [ API ]
     
    _HTTP_APP.post('/api/cache-execute', function (req, res) {
        res.json({ ok: true, time: new Date() });
    });

    //#endregion

    //--------------------------------------------------------------------------------------------

    const on_ready = function (add_port_api) {
        $.on_ready_shared(add_port_api);
    };

    this.f_response_message = function (m_) {
        ___log(m_);

        if (m_ && 'key___' in m_) {
            const key = m.key___;
            if (key) {
                if (_RESPONSE.has(key)) {
                    const res = _RESPONSE.get(key);
                    res.json(m_);
                    res.end();
                    _RESPONSE.del(key);
                }

                if (_REQUEST.has(key)) _REQUEST.del(key);
            }
        }
    };

    this.f_start = function () {

        _HTTP_SERVER.listen(PORT, '127.0.0.1', () => {
            $.ADDRESS_PORT = _HTTP_SERVER.address();
            console.log('HTTP_API: ', $.ADDRESS_PORT);
            on_ready($.ADDRESS_PORT);
        });

        _IO.on('connection', client => {
            if (___CACHE_DONE == false) return;

            //const c = client.handshake.headers.cookie;
            //let uid = '';
            //if (c && c.indexOf('user_id=') != -1) {
            //    const pos = c.indexOf('user_id=') + 8;
            //    uid = c.substr(pos, c.length - pos).split(';')[0].trim();
            //}
            //console.log(uid);

            let user_id;

            client.on('push', data => {
                //if (___CACHE_DONE == false) return;

                //if (user_id == null) ___users_socketio[data.id] = client;
                //user_id = data.id;

                //if (___users_online[user_id] == null || ___users_online[user_id] == 0) {
                //    ___users_online[user_id] = 1;

                //    db___execute_callback(null, null, 'mobile.user_biz_update_user', {
                //        user_id: user_id,
                //        int_type: 1,
                //        int_pol_status: data.status,
                //        int_pol_region: 0,
                //        int_user_create: user_id
                //    }, function (m_) {
                //    }, function (m_) {
                //    });
                //}
            });

            client.on('disconnect', (data) => {
                //if (___CACHE_DONE == false) return;

                //if (user_id != null && ___users_online[user_id] != null) {
                //    //console.log('IO.CLOSE: ...11111111111111111111111111111111111', user_id, data);

                //    ___users_online[user_id] = 0;

                //    db___execute_callback(null, null, 'mobile.user_biz_update_user', {
                //        user_id: user_id,
                //        int_type: 1,
                //        int_pol_status: 0,
                //        int_pol_region: 0,
                //        int_user_create: user_id
                //    }, function (m_) {
                //        //console.log('OK=', m_);
                //    }, function (m_) {
                //        //console.log('FAIL=', m_);
                //    });

                //}
                //if (___users_socketio[user_id]) ___users_socketio[user_id] == null;
            });
        });
    };
};

httpSingleton.instance = null;
httpSingleton.getInstance = function () {
    if (this.instance === null) this.instance = new httpSingleton();
    return this.instance;
};
module.exports = httpSingleton.getInstance();