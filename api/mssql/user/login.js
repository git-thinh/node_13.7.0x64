(function (db_type, cache_name, func_name, request) {
    if ($.LOG) $.LOG.f_console_clear();
    const scope = 'API___' + cache_name + '___' + func_name.toUpperCase();
    const api_id = request.___api_id;
    if (api_id == null) return;
    $.log(scope, api_id);
    //---------------------------------------------------------------------------------------------------------------
    const str_user_name = request.str_user_name;
    const str_pass_word = request.str_pass_word;
    let m = null;

    if (str_user_name === null || str_user_name.length < 5)
        m = { ok: false, error: { message: 'Tài khoản phải nhiều hơn 5 ký tự' }, header: { request: request } };
    if (m) {
        $.api___callback_by_id(api_id, m, true);
        return;
    }

    if (str_pass_word === null || str_pass_word.length < 5)
        m = { ok: false, error: { message: 'Mật khẩu phải nhiều hơn 5 ký tự' }, header: { request: request } };
    if (m) {
        $.api___callback_by_id(api_id, m, true);
        return;
    }

    //$.log(api_id, request);
    //$.api___callback_by_id(api_id, { ok: false, error: { message: '???????????????' }, body: { data: [] }, header: { request: request } }, true);

    ////$.api___search_raw(cache_name, { limit: 1 }, function (o) { return true; }, (err1, body1) => {
    ////    $.log('?????????????????', err1, body1);
    ////    if (err1) {
    ////        m = { ok: false, error: err1, header: { request: request } };
    ////        $.api___callback_by_id(api_id, m, true);
    ////    } else {
    ////        $.api___callback_by_id(api_id, { ok: false, error: { message: '11111111111' }, body: { data: [] }, header: { request: request } }, true);
    ////    }
    ////});

    $.api___search_raw(cache_name, { limit: 1 }, function (o) { return true; }, (err1, body1) => {
        $.log('LOGIN[1]', err1, body1);
        //$.api___callback_by_id(api_id, { ok: false, error: { message: '???????????????' }, body: { data: [] }, header: { request: request } }, true);

        if (err1) {
            m = { ok: false, error: err1, header: { request: request } };
        } else {
            if (body1 != null && Array.isArray(body1.indexs) && body1.indexs.length > 0) {
                const index_ = body1.indexs[0];
                $.log('LOGIN[2]', index_);
                let user_ = $.api___get_raw_by_index('USER', index_);
                $.log('LOGIN[3]', user_);
                if (user_ == null) {
                    m = { ok: false, error: { message: 'Không tìm thấy tài khoản index = ' + _index }, header: { request: request } };
                } else {
                    user_.ok = true;
                    user_.int_pol_status = 1; // 0: offline; 1: online

                    $.log('LOGIN[4]', user_);

                    let user = JSON.parse(JSON.stringify(user_));
                    delete user['str_password'];
                    
                    let cf = {};
                    //___search_raw('POS_SYS_CONFIG', function (o) { return true; }, (err2, body2) => {
                    //    if (err2) {
                    //    } else {
                    //        if (body2 && body2.data) {
                    //            const acf = body2.data;
                    //            for (var i = 0; i < acf.length; i++) {
                    //                let o = acf[i];
                    //                cf[o.str_code] = o.str_value;
                    //            }
                    //        }
                    //    }
                    //});
                    ////console.log('LOGIN = ', acf, cf);
                    user.pos_sys_config = cf;

                    $.log('LOGIN[5]', user);

                    body1.data = user;
                    m = { ok: true, body: body1, header: { request: request } };
                }
            } else {
                m = { ok: false, error: { message: 'Vui lòng nhập chính xác thông tin tài khoản' }, header: { request: request } };
            }            
        }

        $.api___callback_by_id(api_id, m, true);

    });

})();