var cacheSingleton = function cacheSingleton() {
    //--------------------------------------------------------------------------------------------
    const { Worker, MessageChannel } = require('worker_threads');
    let on_ready = function () { };

    const worker1 = new Worker('./cache-index.js', { workerData: { id: 1 } });
    const cacheChannel1 = new MessageChannel();
    const worker2 = new Worker('./cache-index.js', { workerData: { id: 2 } });
    const cacheChannel2 = new MessageChannel();

    let _ID_CURRENT = 1;

    //--------------------------------------------------------------------------------------------
    this.thread_on_message = function (id, m) {

    };
    this.channel_on_message = function (id, m) {

    };
    this.f_send_message = function (m_) {
        switch (_ID_CURRENT) {
            case 1:
                worker1.postMessage(m_);
                break;
            case 2:
                worker2.postMessage(m_);
                break;
        }
    };
    this.f_start = function () {
        worker1.on('message', (m_) => { this.thread_on_message(1, m_); });
        worker1.postMessage({ cache_port: cacheChannel1.port1 }, [cacheChannel1.port1]);
        cacheChannel1.port2.on('message', (m_) => { this.channel_on_message(1, m_); });

        worker2.on('message', (m_) => { this.thread_on_message(2, m_); });
        worker2.postMessage({ cache_port: cacheChannel2.port1 }, [cacheChannel2.port1]);
        cacheChannel2.port2.on('message', (m_) => { this.channel_on_message(2, m_); });
    };
    //--------------------------------------------------------------------------------------------
};

cacheSingleton.instance = null;
cacheSingleton.getInstance = function () {
    if (this.instance === null) this.instance = new cacheSingleton();
    return this.instance;
};
module.exports = cacheSingleton.getInstance();