﻿let httpSingleton = function httpSingleton() {
    // Defining a var instead of this (works for variable & function) will create a private definition
    //--------------------------------------------------------------------------------------------
    let _CACHE_STORE = null;
    let on_ready = function () { };
    //--------------------------------------------------------------------------------------------
    const _PATH = require('path');
    const _HTTP_EXPRESS = require('express');
    const _HTTP_BODY_PARSER = require('body-parser');
    const _HTTP_APP = _HTTP_EXPRESS();

    const _HTTP_SERVER = require('http').createServer(_HTTP_APP);
    const _IO = require('socket.io')(_HTTP_SERVER);
    //--------------------------------------------------------------------------------------------
    
    const NodeCache = require("node-cache");
    const myCache = new NodeCache();
       
    //#region [ API ]
    
    _HTTP_APP.use(_HTTP_EXPRESS.static(_PATH.join(__dirname, 'htdocs')));

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

    _HTTP_APP.get('/test', function (req, res) {
        res.json({ ok: true, time: new Date() });
    });

    //--------------------------------------------------------------------------------------------

    //#endregion

    this.f_start = function (port, _cache) {
        _CACHE_STORE = _cache;

        _HTTP_SERVER.listen(port, this.onReady);

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