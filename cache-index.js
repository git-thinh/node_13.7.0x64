const _ = require('lodash');
const { parentPort, workerData } = require('worker_threads');
const _ID = workerData.id;
const ___log = (...agrs) => console.log('T' + _ID + ': ', ...agrs);

//--------------------------------------------------------------------------------------------
let _CACHE_CHANNEL = null;
let _MSG = [];
let _STATE = 'NONE';
let _BUSY = false;

//--------------------------------------------------------------------------------------------
parentPort.on('message', (m_) => {
    if (m_) {
        if (m_.cache_port) {
            _STATE = 'INIT';
            _CACHE_CHANNEL = m_.cache_port;
        } else if (m_ == 'STATE') {
            _CACHE_CHANNEL.postMessage({
                id: _ID,
                state: _STATE,
                is_busy: _BUSY,
                command: 'STATE',
                data: null
            });
        } else {
            _MSG.push(m_);
        }
    }
});

function cache___Start(m_) {
    _STATE = 'CACHING';

    ___log(m_);
    _STATE = 'CACHE_READY';

    _CACHE_CHANNEL.postMessage({
        key___: m_.key___,
        ok: true,
        id: _ID,
        state: _STATE,
        is_busy: _BUSY,
        command: m_.command,
        data: null
    });
}

//--------------------------------------------------------------------------------------------

function proccess_message() {
    if (_BUSY) {
        setTimeout(function () { proccess_message(); }, 1000);
        return;
    }

    if (_MSG.length == 0) {
        setTimeout(function () { proccess_message(); }, 1000);
        return;
    }

    _BUSY = true;
    const m_ = _MSG.shift();
    if (m_ && m_.command) {

        switch (m_.command) {
            case 'CACHE_INIT':
                cache___Start(m_);
                break;
        }

        _BUSY = false;
        proccess_message();
    }
}
