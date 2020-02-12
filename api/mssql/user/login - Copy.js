(function (db_type, cache_name, func_name, request) {
    if ($.LOG) $.LOG.f_console_clear();

    const scope = 'API___' + cache_name + '___' + func_name.toUpperCase();
    const api_id = request.___api_id;
    if (api_id == null) return;
    console.log(scope, api_id);
    //console.log = (...agrs) => ___log_key(scope, ...agrs);
    const ___callback = (m) => $.api___callback_by_id(api_id, m, true);
    const ___search_raw = (cache_name_, condition_, callback_) => $.api___search_raw(cache_name_, condition_, callback_);
    const ___search_ext = (cache_name_, condition_, callback_) => $.api___search_ext(cache_name_, condition_, callback_);
    const ___get_raw_by_index = (cache_name_, i_) => { return $.api___get_raw_by_index(cache_name_, i_); };
    //---------------------------------------------------------------------------------------------------------------
    const str_user_name = request.str_user_name;
    const str_pass_word = request.str_pass_word;
    let m = null;

    if (str_user_name === null || str_user_name.length < 5)
        m = { ok: false, error: { message: 'Tài khoản phải nhiều hơn 5 ký tự' }, header: { request: request } };
    if (m) {
        ___callback(m);
        return;
    }

    if (str_pass_word === null || str_pass_word.length < 5)
        m = { ok: false, error: { message: 'Mật khẩu phải nhiều hơn 5 ký tự' }, header: { request: request } };
    if (m) {
        ___callback(m);
        return;
    }

    //console.log(api_id, request);
    //___callback({ ok: false, error: { message: '???????????????' }, body: { data: [] }, header: { request: request } });

    ___search_raw(cache_name, { limit: 1 }, function (o) { return true; }, (err1, body1) => {
        console.log('?????????????????', err1);

        //if (err1) {
        //    m = { ok: false, error: err1, header: { request: request } };
        //    ___callback(m);
        //} else {
        ___callback({ ok: false, error: { message: '11111111111' }, body: { data: [] }, header: { request: request } });
        //}        
    });

    //////___search_raw(cache_name, function (o) { return true; }, (err1, body1) => {
    //////    if (err) {
    //////        m = { ok: false, error: err1, header: { request: request } };
    //////    } else {
    //////        if (body1 && body1.data && body1.data.length > 0) {
    //////            ___log_key(scope + '_LOGIN_OK', body1);

    //////            //const user_ = body1.data[0];
    //////            //user_.ok = true;
    //////            //user_.int_pol_status = 1; // 0: offline; 1: online

    //////            //let user = JSON.parse(JSON.stringify(user_));
    //////            //delete user['str_password'];

    //////            //let cf = {};
    //////            //___search_raw('POS_SYS_CONFIG', function (o) { return true; }, (err2, body2) => {
    //////            //    if (err2) {
    //////            //    } else {
    //////            //        if (body2 && body2.data) {
    //////            //            const acf = body2.data;
    //////            //            for (var i = 0; i < acf.length; i++) {
    //////            //                let o = acf[i];
    //////            //                cf[o.str_code] = o.str_value;
    //////            //            }
    //////            //        }
    //////            //    }
    //////            //});
    //////            ////console.log('LOGIN = ', acf, cf);
    //////            //user.pos_sys_config = cf;

    //////            //body1.data = user;
    //////            m = { ok: true, body: body1, header: { request: request } };
    //////        } else {
    //////            m = { ok: false, error: { message: 'Vui lòng nhập chính xác thông tin tài khoản' }, header: { request: request } };
    //////        }
    //////    }
    //////    ___callback(m);
    //////});

})();