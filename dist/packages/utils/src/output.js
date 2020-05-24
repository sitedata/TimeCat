import { TPL } from './tpl';
import { DBPromise } from './store/idb';
import { filteringScriptTag } from './tools/dom';
import { isDev, classifyRecords } from './tools/common';
import pako from 'pako';
const parser = new DOMParser();
const html = parser.parseFromString(TPL, 'text/html');
export async function exportReplay(opts = {}) {
    await injectData();
    await initOptions(opts);
    createAndDownloadFile(`TimeCat-${Date.now()}`, html.documentElement.outerHTML);
}
function createAndDownloadFile(fileName, content) {
    var aTag = document.createElement('a');
    var blob = new Blob([content], { type: 'text/html' });
    aTag.download = fileName + '.html';
    aTag.href = URL.createObjectURL(blob);
    aTag.click();
    URL.revokeObjectURL(blob);
}
async function initOptions(opts) {
    const { autoPlay, scripts } = opts;
    const scriptList = scripts || [];
    if (autoPlay) {
        scriptList.push({
            name: 'time-cat-init',
            src: `cat.replay()`
        });
    }
    await injectScripts(scriptList);
}
async function injectScripts(scripts) {
    if (scripts) {
        for (let scriptItem of scripts) {
            const { src, name } = scriptItem;
            let scriptContent = src;
            const script = document.createElement('script');
            script.id = name;
            const isUrlReg = /^(chrome-extension|https?):\/\/.+/;
            if (isUrlReg.test(src)) {
                if (isDev) {
                    script.src = src;
                }
                else {
                    scriptContent = await getScript(src);
                }
            }
            script.text = scriptContent;
            html.body.appendChild(script);
        }
    }
}
async function getScript(src) {
    return await fetch(src)
        .then(res => res.text())
        .then(filteringScriptTag);
}
async function getDataFromDB() {
    const indexedDB = await DBPromise;
    const data = await indexedDB.getRecords();
    return classifyRecords(data);
}
async function injectData() {
    const dataScript = document.createElement('script');
    const data = window.__ReplayDataList__ || (await getDataFromDB());
    const jsonStrData = JSON.stringify(data);
    const zipArray = pako.gzip(jsonStrData);
    const scriptContent = `var __ReplayStrData__ = ${"'" + zipArray.toString() + "'"}`;
    dataScript.innerText = scriptContent;
    html.body.insertBefore(dataScript, html.body.firstChild);
}
