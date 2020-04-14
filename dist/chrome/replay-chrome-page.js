(function () {
    'use strict';

    function dispatchEvent(type, data = null) {
        event = new CustomEvent(type, { detail: data });
        window.dispatchEvent(event);
    }

    let ctrl;
    function record(e) {
        const wr = window.wr;
        const { DB, record } = wr;
        DB.then((db) => {
            db.clear();
            ctrl = record({
                emitter: (data) => {
                    db.add(data);
                }
            });
        });
    }
    function replay(e) {
        const wr = window.wr;
        if (ctrl) {
            const { scripts } = e.detail;
            wr.exportReplay({
                scripts,
                autoPlay: true
            });
            ctrl.uninstall();
        }
    }
    function setWarn(handle) {
        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState == 'hidden') {
                if (ctrl) {
                    ctrl.uninstall();
                    ctrl = null;
                }
                dispatchEvent('CHROME_RECORD_CANCEL');
            }
        });
    }
    window.addEventListener('CHROME_RECORD_START', record, false);
    window.addEventListener('CHROME_RECORD_FINISH', replay, false);
    setWarn();

}());
