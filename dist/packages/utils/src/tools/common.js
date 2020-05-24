export const isDev = process.env.NODE_ENV === 'development';
export function logger(data) {
    console.log('record', data);
}
export function getTime() {
    return performance.timing.navigationStart + performance.now();
}
export function secondToDate(ms) {
    if (ms <= 0) {
        ms = 0;
    }
    const [h, m, s] = [Math.floor(ms / 3600), Math.floor((ms / 60) % 60), Math.floor(ms % 60)];
    const timeStr = [h, m, s].map(i => (i <= 9 ? '0' + i : i)).join(':');
    return timeStr.replace(/^00\:/, '');
}
export function isSnapshot(frame) {
    return !!frame.vNode;
}
export function classifyRecords(data) {
    const dataList = [];
    let viewData;
    data.forEach(item => {
        if (isSnapshot(item)) {
            viewData = { snapshot: item, records: [] };
            dataList.push(viewData);
        }
        else {
            viewData.records.push(item);
        }
    });
    return dataList;
}
export async function delay(t = 200) {
    return new Promise(r => {
        setTimeout(() => r(), t);
    });
}
export function isVNode(n) {
    return !!n.tag;
}
