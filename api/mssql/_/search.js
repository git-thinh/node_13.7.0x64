(async function (db_type, cache_name, func_name, request) {
    if ($.LOG) $.LOG.f_console_clear();
    const scope = 'API___' + cache_name + '___' + func_name.toUpperCase();
    const api_id = request.___api_id;
    if (api_id == null) return;
    $.log(scope, api_id, request);
    //--------------------------------------------------------------------------------------------------------------- 
    let m = null;

    const sql = {
        POL_PAWN: [
            { '62c325db-95ef-42da-af8d-c2b53d41d9fd': 1 },
            { '62c325db-95ef-42da-af8d-c2b53d41d912': 2 }
        ]
    };

    const cache_template = {
        POL_PAWN: [
            { ___guid: '62c325db-95ef-42da-af8d-c2b53d41d9fd', id: 0, int_date_created: 20200212 },
            { ___guid: '62c325db-95ef-42da-af8d-c2b53d41d912', id: 0, int_date_created: 20200212 },
        ]
    };

    m = {
        ok: true,
        header: { request: request },
        body: {
            v1: true,
            ok: true,
            request: {
                conditons: "function(o) { return true; }",
                page_number: 1,
                page_size: 15,
                ___url: "/api/pol_pawn/search",
                ___api: cache_name
            },
            total_items: 456912,
            count_result: 0,
            page_total: 0,
            page_number: 1,
            page_size: 15,
            result_items: []
        }
    };

    $.api___callback_by_id(api_id, m, true);;
})