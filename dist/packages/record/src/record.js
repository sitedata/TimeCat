import { watchers } from './watcher';
import { listenerStore, DBPromise } from '@TimeCat/utils';
import { snapshots } from '@TimeCat/snapshot';
const ctrl = {
    unsubscribe: () => {
        Array.from(listenerStore.values()).forEach(un => un());
    }
};
function getSnapshotData(emit) {
    const { getInitInfo, DOMSnapshot } = snapshots;
    const initInfo = getInitInfo();
    const snapshot = DOMSnapshot();
    emit({ ...initInfo, ...snapshot });
}
function recordAll(emitter) {
    const recordTasks = [getSnapshotData, ...Object.values(watchers)];
    recordTasks.forEach(task => task(emitter));
}
export const record = (fn) => {
    DBPromise.then(db => {
        db.clear();
        recordAll(data => {
            if (fn) {
                fn(data, db);
                return;
            }
            db.add(data);
        });
    });
    return ctrl;
};
