let ___CACHE_DATA = {};
let ___CACHE_INDEX = {};
let ___CACHE_SETTING = {
    join_1_1: {
        TEST: {
            user_created_id: 'USER',
            cus_created_id: 'POL_CUSTOMER',
            customer_id: 'POL_CUSTOMER',
            caller_shop_id: 'USER',
            caller_online_id: 'USER',
            group_id: 'GROUP'
        }
    },
    join_1_n: {
        TEST: {
            ___list_support_schedule: 'POL_SUPPORT_SCHEDULE.int_pawn_online_id',
            ___list_online_process: 'POL_PROCESS.int_pol_pawn_id'
        }
    },
    full_text_search: {
        TEST: {
            ids: ',id,customer_id,int_pawn_id_pos,',
            ascii: ',lng_money,int_days,int_created_date,str_channel_name,',
            utf8: ',str_asset_type_name,str_channel_name,str_city_name,str_district_name,str_description,str_trademark,',
            org: ',str_asset_type_name,'
        }
    }
};

const ___INFO = {
    APP_NAME: '',
    TCP_CACHE_INIT: { address: '127.0.0.1', port: 0 },
    TCP_CACHE_UPDATE: { address: '127.0.0.1', port: 0 },
    HTTP_API: { address: '127.0.0.1', port: 0 }
};
//----------------------------------------------------------------------------
const _EVENT_LOGGER = require('node-windows').EventLogger;
let _LOG = null;


//----------------------------------------------------------------------------
const _JOB = require('cron').CronJob;

//----------------------------------------------------------------------------
let _CACHE_STORE = require('./cache-singleton.js');
let _HTTP_STORE = require('./http-singleton.js');

_CACHE_STORE.CACHE_DATA = ___CACHE_DATA;
_CACHE_STORE.CACHE_INDEX = ___CACHE_INDEX;
_CACHE_STORE.CACHE_SETTING = ___CACHE_SETTING;

_CACHE_STORE.INFO = ___INFO;
_CACHE_STORE.HTTP_STORE = _HTTP_STORE;

_HTTP_STORE.INFO = ___INFO;
_HTTP_STORE.CACHE_STORE = _CACHE_STORE;

_CACHE_STORE.on_ready = function (add_port_init, add_port_update) {
    ___INFO.TCP_CACHE_INIT = add_port_init;
    ___INFO.TCP_CACHE_UPDATE = add_port_update;

    // Setup LOG on windows Events Viewer
    _LOG = new _EVENT_LOGGER(___INFO.APP_NAME);
    _LOG.info(___INFO.APP_NAME + ': Starting at ' + new Date().toLocaleString() +
        ' - HTTP_API: ' + ___INFO.HTTP_API.port + ', TCP_CACHE_INIT: ' + ___INFO.TCP_CACHE_INIT.port + ', TCP_CACHE_UPDATE: ' + ___INFO.TCP_CACHE_UPDATE.port);
    //_LOG.warn('Watch out!');
    //_LOG.error('Something went wrong.');
    _CACHE_STORE.LOG = _LOG;
    _HTTP_STORE.LOG = _LOG;
};
_CACHE_STORE.on_busy = function (state_) {
    console.log('CACHE ENGINE is busy: ', state_);
};

_HTTP_STORE.on_ready = function (add_port_api) {
    ___INFO.HTTP_API = add_port_api;
    ___INFO.APP_NAME = 'CACHE_' + ___INFO.HTTP_API.port;

    _CACHE_STORE.f_start();
};
_HTTP_STORE.f_start();
//----------------------------------------------------------------------------


//----------------------------------------------------------------------------
new _JOB('* * * * * *', function () {
    //console.log(new Date());    
}).start();

