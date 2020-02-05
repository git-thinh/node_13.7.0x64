const ___log = (...agrs) => console.log('DB: ', ...agrs);

const _sql_select_top = 'top 1000 '; //
const ___CACHE_DATA_RAW = {};
const ___CACHE_SETTING = {
    connect_string: {
        db_123: {
            user: 'sa',
            password: 'dev@123',
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
            password: 'HjdbFV7jos9bc6lw',
            server: '192.168.10.37',
            database: 'Release_FB51_App',
            connectionTimeout: 300000,
            requestTimeout: 300000,
            pool: {
                idleTimeoutMillis: 300000,
                max: 10
            },
            scripts: [
                "USER",
                "GROUP",
                "POS_SYS_CONFIG",
                "SHOP",
                "REGION"
            ]
        }
    },
    script: {
        POL_PAWN: "SELECT " + _sql_select_top + " *,isnull( (select * from [SplitStringToTable](str_url,'&')),'') as str_campaign FROM mobile.pol_pawn order by id desc",
        POL_PROCESS: "SELECT " + _sql_select_top + " * FROM mobile.pol_online_process order by int_pol_pawn_id desc",
        POL_CUSTOMER: "SELECT " + _sql_select_top + " * FROM mobile.pol_customer order by id desc",
        //POL_CUSTOMER: "SELECT top 5000 * FROM mobile.pol_customer order by id desc",
        GROUP: "SELECT \
                    GroupID as id \
                    ,ParentID as parent_id \
                    ,Code as str_code \
                    ,[Name] as str_name \
                    ,[Status] as int_status \
            FROM [pos].[Group] where IsShop=1 or GroupID=44 or GroupID=58",
        POS_SYS_CONFIG: "SELECT \
                            0 as id \
                        ,[Code] as str_code \
                        ,[Type] as str_type \
                        ,[Value] as str_value \
                        ,[Name] as str_name \
                        ,[Status] as int_status \
                        FROM [pos].[SysConfig] \
                        where Type='PawnOnlineOption'",
        SHOP: "select \
                    shopid as id \
                    , code \
                    , [name] as str_name \
            from pos.shopdetail",
        REGION: "select \
                        [RegionID] as id \
                        ,[Name] as str_name \
                        ,isnull([ParentID],0) as int_pid \
                        , isnull((select [Name] from pos.region as b where b.[RegionID] = a.[ParentID] ),'') as str_parent_name \
                from pos.region as a where [status]=1",
        USER: "SELECT  u.UserID as id, \
                ISNULL(u.CalloutToken,'') as str_call_out_tooken, \
                u.ApproveLevel as int_approve_level, \
                ISNULL(u.UserPosition,0) as str_user_position, \
                ug.GroupID as group_id, \
                u.UserName as str_user_name, \
                        ISNULL( u.[POLStatus],0) as int_pol_status, \
                        ISNULL( [POLRegion],0) as int_pol_region, \
                g.[Name] as str_group_name, \
                u.UserFullName as str_full_name, \
                '12345@abc' as str_pass_word, \
                        u.[UserPass] as str_pass, \
                (CASE \
                        WHEN u.ApproveLevel = 1 AND UserPosition = 4 THEN N'Nhân viên cửa hàng' \
                        WHEN u.ApproveLevel = 1 AND UserPosition = 3 THEN N'Quản lý CH' \
                        WHEN u.ApproveLevel = 2 THEN 'QLKV' END) \
                        as str_possition, \
                    (CASE \
                        WHEN ug.GroupID = 44  THEN N'1' else (select top(1) s.ShopID from pos.[GroupShop] gs  inner JOIN pos.[ShopDetail] s ON gs.ShopCode = s.Code where g.GroupID = gs.GroupID) \
                            end) as shop_id, \
                        (CASE \
                WHEN ug.GroupID = 44  THEN N'Hỗ trợ khách hàng' else  (select top(1) s.[Name] from pos.[GroupShop] gs  inner JOIN pos.[ShopDetail] s ON gs.ShopCode = s.Code where g.GroupID = gs.GroupID) \
                end) as str_shop_name, \
                        (case u.UserID when 617 then 1 else 0 end) as bit_admin_caller \
                ,isnull(u.UserEmail,'') as str_user_email \
                FROM [pos].[User]  u \
                left JOIN pos.[UserGroup] ug ON ug.UserID = u.UserID \
                left JOIN pos.[Group] g ON ug.GroupID = g.GroupID  AND g.STATUS = 1 \
            where u.Status =1",
        POL_ASSET_TYPE: "SELECT * FROM mobile.pol_asset",
        POL_AREA: "select  * from mobile.pol_area",
        POL_CHANNEL: "select * from mobile.pol_channel",
        POL_PRIORITY: "SELECT * FROM [mobile].[pol_priority]",
        POL_NOTIFY: "SELECT * FROM mobile.pol_notify order by int_date,int_time desc",
        POL_NOTIFY_STATE: "SELECT * FROM mobile.pol_notify_state order by int_date,int_time desc",
        POL_REASON_FAIL: "SELECT  * FROM mobile.pol_reason_fail",
        POL_STEP: "select * from mobile.pol_step",
        POL_SUPPORT_SCHEDULE: "SELECT  * FROM mobile.pol_support_schedule",
        POL_SYS_EMAIL: "SELECT * FROM [mobile].[sys_email]",
        POL_SYS_SMS: "SELECT * FROM [mobile].[sys_sms]"
    }
};

const _FS = require('fs');
const _SQL = require('mssql'); 

const ___main_CacheReady = function () {
    // utf8 ascii
    _FS.writeFile('raw.txt', JSON.stringify(___CACHE_DATA_RAW), 'utf8', (err) => {
        if (err) throw err;

        ___log('\n\n-> CACHE_DONE .... ');
    });
};

let _CACHE_TOTAL, _CACHE_COUNTER;

const cache___writeFileTXT = async function () {

    _CACHE_TOTAL = ___CACHE_SETTING.connect_string.db_123.scripts.length + ___CACHE_SETTING.connect_string.db_amz.scripts.length;
    _CACHE_COUNTER = 0;

    for (var con_str in ___CACHE_SETTING.connect_string) {
        const con_cf = ___CACHE_SETTING.connect_string[con_str];

        const _POOL = new _SQL.ConnectionPool(con_cf);
        const _POOL_CONNECT = _POOL.connect();

        // ensures that the pool has been created
        await _POOL_CONNECT;

        let text_sql = '', request;
        con_cf.scripts.forEach((cache_name) => {
            ___CACHE_DATA_RAW[cache_name] = [];

            text_sql = ___CACHE_SETTING.script[cache_name];
            if (text_sql) {
                request = _POOL.request();
                request.stream = true;
                request.query(text_sql);

                request.on('recordset', columns => { });

                request.on('row', row => {
                    //___log(cache_name + ': ', row);                    
                    row.___i = ___CACHE_DATA_RAW[cache_name].length;
                    ___CACHE_DATA_RAW[cache_name].push(row);
                });

                request.on('error', err => {
                    ___log('\n\nERROR = ' + cache_name, err.toString());
                    _CACHE_COUNTER++;
                    if (_CACHE_COUNTER == _CACHE_TOTAL) ___main_CacheReady();
                });

                request.on('done', result => {
                    _CACHE_COUNTER++;
                    ___log('--- OK ' + cache_name + ': \t\t\t = ' + result.rowsAffected[0]);
                    if (_CACHE_COUNTER == _CACHE_TOTAL) ___main_CacheReady();
                });
            } else {
                _CACHE_COUNTER++;
                    ___log('\n\nERROR = ' + cache_name + ' cannot find script to execute ...');
                if (_CACHE_COUNTER == _CACHE_TOTAL) ___main_CacheReady();
            }
        });
    }
};

cache___writeFileTXT();



