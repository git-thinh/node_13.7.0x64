let ___CACHE_DONE = false;
const ___PORT_API = 12345;

//----------------------------------------------------------------------------

const { Worker, MessageChannel, workerData } = require('worker_threads');

const _PATH = require('path');
const _FS = require('fs');
const _ = require('lodash');

const _FETCH = require('node-fetch');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const _JOB = require('cron').CronJob;

//----------------------------------------------------------------------------
const _CACHE_STORE = require('./cache-singleton.js');
_CACHE_STORE.on_ready = function () {
    console.log('CACHE ENGINE running ...');
};
_CACHE_STORE.f_start();

const _HTTP_STORE = require('./http-singleton.js');
_HTTP_STORE.on_ready = function () {
    console.log('HTTP SERVER running ...');
};
_HTTP_STORE.f_start(___PORT_API, _CACHE_STORE);
//----------------------------------------------------------------------------



new _JOB('* * * * * *', function () {
    console.log(new Date());    
}).start();

