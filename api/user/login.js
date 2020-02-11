(function (cache_name, func_name, request) {
    const scope = 'API_' + cache_name + '_' + func_name.toUpperCase();
    const api_id = request.___api_id;
    ___log(scope, api_id);

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

    $.data_raw___filter(cache_name, function (o) { return true; }, (err, results) => { 
        if (err) {
            m = { ok: false, error: { message: 'Lỗi đăng nhập khi kiểm tra tài khoản và mật khẩu', error: err }, header: { request: request } };
        } else {
            if (results && results.length > 0) {
                m = { ok: true, body: { data: results[0] }, header: { request: request }};
            } else {
                m = { ok: false, error: { message: 'Vui lòng nhập chính xác thông tin tài khoản' }, header: { request: request } };
            }
        }
        $.api___callback_by_id(api_id, m, true);
    });
})();