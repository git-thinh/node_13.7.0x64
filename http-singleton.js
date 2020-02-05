let httpSingleton = function httpSingleton() {
    const $ = this;

    // Defining a var instead of this (works for variable & function) will create a private definition
    //--------------------------------------------------------------------------------------------
    const ___log = (...agrs) => console.log('API: ', ...agrs);

    //--------------------------------------------------------------------------------------------
    let ADDRESS_PORT = { address: '127.0.0.1', port: 0 };

    let on_ready = function () { };
    //--------------------------------------------------------------------------------------------
    const ___guid = function () {
        return 'id-xxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

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
        if (___CACHE_DONE == false) {
            return res.json({ ok: false, mesage: 'Api is caching ...' });
        }
        if (error !== null) {
            return res.json({ ok: false, mesage: 'Invalid json ' + error.toString() });
        }
        return next();
    });

    //--------------------------------------------------------------------------------------------

    //#region [ API ]

    _HTTP_APP.get('/', function (req, res) {
        res.json($.INFO);
    });
    _HTTP_APP.get('/test-log', function (req, res) { 
        const _self = $;
        const s = _self.INFO.APP_NAME + ' Test LOG at ' + new Date().toLocaleString();
        _self.LOG.info(s);
        res.json({ ok: true, message: s });
    });
    _HTTP_APP.get('/raw/:cache_name', function (req, res) {
        const api = req.params.cache_name;
        if (api) {
            const cache_name = api.toUpperCase();
            const _self = $;
            const val = _self.CACHE_STORE.f_get___test(cache_name);
            res.json(val);
        } else {
            res.json([]);
        }
    });

    _HTTP_APP.get('/cache-setting', function (req, res) {
        const _self = $;

        const val = _self.CACHE_STORE.f_get___cache_setting();
        //___log(val);

        res.json(val);
    });

    _HTTP_APP.post('/cache-setting', function (req, res) {
        const m_ = req.body;
        //___log(m_);
        const _self = $;

        _self.CACHE_STORE.f_set___cache_setting(m_);

        res.json(_self.CACHE_STORE.f_get___cache_setting());
    });

    _HTTP_APP.post('/api/cache-execute', function (req, res) {
        //res.json({ ok: true, time: new Date() });

    });

    //#endregion

    //--------------------------------------------------------------------------------------------

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
        const _self = this; 

        _HTTP_SERVER.listen(0, '127.0.0.1', () => {
            _self.ADDRESS_PORT = _HTTP_SERVER.address();
            console.log('HTTP_API: ', _self.ADDRESS_PORT);
            _self.on_ready(_self.ADDRESS_PORT);
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