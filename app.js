let ___CACHE_DATA = {};
let ___CACHE_INDEX = {};
let ___CACHE_SETTING = {
    connect_string: {
        db_123: {
            user: 'sa',
            password: '',
            server: '192.168.10.54',
            database: 'POL_20191230',
            connectionTimeout: 300000,
            requestTimeout: 300000,
            pool: {
                idleTimeoutMillis: 300000,
                max: 10
            },
            scripts: [
                "POL_PAWN",
                "POL_CUSTOMER",
                "POL_PROCESS",
                "POL_ASSET_TYPE",
                "POL_AREA",
                "POL_CHANNEL",
                "POL_PRIORITY",
                "POL_NOTIFY",
                "POL_NOTIFY_STATE",
                "POL_REASON_FAIL",
                "POL_STEP",
                "POL_SUPPORT_SCHEDULE",
                "POL_SYS_EMAIL",
                "POL_SYS_SMS"
            ]
        },
        db_amz: {
            user: 'mobile',
            password: '',
            server: '192.168.10.37',
            database: 'Release_FB51_App',
            connectionTimeout: 300000,
            requestTimeout: 300000,
            pool: {
                idleTimeoutMillis: 300000,
                max: 10
            },
            scripts: ["GROUP", "POS_SYS_CONFIG", "SHOP", "REGION", "USER"]
        }
    },
    scripts: {
        POL_PAWN: "SELECT top 5000 *,isnull( (select * from [SplitStringToTable](str_url,'&')),'') as str_campaign FROM mobile.pol_pawn order by id desc",
        POL_CUSTOMER: "SELECT top 5000 * FROM mobile.pol_customer order by id desc",
        POL_PROCESS: "SELECT top 5000 * FROM mobile.pol_online_process order by int_pol_pawn_id desc",
        GROUP: "SELECT GroupID as id, ParentID as parent_id, Code as str_code, [Name] as str_name, [Status] as int_status FROM [pos].[Group] where IsShop=1 or GroupID=44 or GroupID=58",
        POS_SYS_CONFIG: "SELECT 0 as id, [Code] as str_code, [Type] as str_type, [Value] as str_value, [Name] as str_name, [Status] as int_status FROM [pos].[SysConfig] where Type='PawnOnlineOption'",
        SHOP: "select shopid as id, code, [name] as str_name from pos.shopdetail",
        REGION: "select [RegionID] as id, [Name] as str_name, isnull([ParentID],0) as int_pid, isnull((select [Name] from pos.region as b where b.[RegionID] = a.[ParentID] ),'') as str_parent_name from pos.region as a where [status]=1",
        USER: "SELECT  u.UserID as id, ISNULL(u.CalloutToken,'') as str_call_out_tooken, u.ApproveLevel as int_approve_level,  ISNULL(u.UserPosition,0) as str_user_position, ug.GroupID as group_id, u.UserName as str_user_name, ISNULL( u.[POLStatus],0) as int_pol_status, ISNULL( [POLRegion],0) as int_pol_region, g.[Name] as str_group_name, u.UserFullName as str_full_name, '12345@abc' as str_pass_word, u.[UserPass] as str_pass, (CASE WHEN u.ApproveLevel = 1 AND UserPosition = 4 THEN N'Nhân viên cửa hàng' WHEN u.ApproveLevel = 1 AND UserPosition = 3 THEN N'Quản lý CH' WHEN u.ApproveLevel = 2 THEN 'QLKV' END) as str_possition, (CASE WHEN ug.GroupID = 44  THEN N'1' else (select top(1) s.ShopID from pos.[GroupShop] gs  inner JOIN pos.[ShopDetail] s ON gs.ShopCode = s.Code where g.GroupID = gs.GroupID) end) as shop_id, (CASE WHEN ug.GroupID = 44  THEN N'Hỗ trợ khách hàng' else  (select top(1) s.[Name] from pos.[GroupShop] gs  inner JOIN pos.[ShopDetail] s ON gs.ShopCode = s.Code where g.GroupID = gs.GroupID) end) as str_shop_name, (case u.UserID when 617 then 1 else 0 end) as bit_admin_caller ,isnull(u.UserEmail,'') as str_user_email FROM [pos].[User]  u left JOIN pos.[UserGroup] ug ON ug.UserID = u.UserID left JOIN pos.[Group] g ON ug.GroupID = g.GroupID  AND g.STATUS = 1 where u.Status =1",
        POL_ASSET_TYPE: "SELECT * FROM mobile.pol_asset",
        POL_AREA: "select * from mobile.pol_area",
        POL_CHANNEL: "select * from mobile.pol_channel",
        POL_PRIORITY: "SELECT * FROM [mobile].[pol_priority]",
        POL_NOTIFY: "SELECT * FROM mobile.pol_notify order by int_date,int_time desc",
        POL_NOTIFY_STATE: "SELECT * FROM mobile.pol_notify_state order by int_date,int_time desc",
        POL_REASON_FAIL: "SELECT  * FROM mobile.pol_reason_fail",
        POL_STEP: "select * from mobile.pol_step",
        POL_SUPPORT_SCHEDULE: "SELECT  * FROM mobile.pol_support_schedule",
        POL_SYS_EMAIL: "SELECT * FROM [mobile].[sys_email]",
        POL_SYS_SMS: "SELECT * FROM [mobile].[sys_sms]"
    },
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

