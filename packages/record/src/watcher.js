import { createFlatVNode } from '@TimeCat/virtual-dom';
import { RecordType, FormElementEvent, MouseEventType } from './types';
import { throttle, isDev, nodeStore, listenerStore, getTime, isExistingNode, debounce, isVNode } from '@TimeCat/utils';
function emitterHook(emit, data) {
    if (isDev) {
    }
    emit(data);
}
function registerEvent(eventTypes, handleFn, opts, type = 'throttle', waitTime = 500) {
    let listenerHandle;
    if (type === 'throttle') {
        listenerHandle = throttle(handleFn, waitTime, {
            trailing: true
        });
    }
    else {
        listenerHandle = debounce(handleFn, waitTime, {
            isImmediate: false
        });
    }
    eventTypes
        .map(type => (fn) => {
        window.addEventListener(type, fn, opts);
    })
        .forEach(handle => handle(listenerHandle));
    listenerStore.add(() => {
        eventTypes.forEach(type => {
            window.removeEventListener(type, listenerHandle, opts);
        });
    });
}
function windowWatcher(emit) {
    const width = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    function emitData(target) {
        emitterHook(emit, {
            type: RecordType.WINDOW,
            data: {
                id: nodeStore.getNodeId(target) || null,
                width: width(),
                height: height()
            },
            time: getTime().toString()
        });
    }
    emitData(document);
    function handleFn(e) {
        const { type, target } = e;
        if (type === 'resize') {
            emitData(target);
        }
    }
    registerEvent(['resize'], handleFn, { capture: true });
}
function scrollWatcher(emit) {
    const scrollTop = (target) => target.scrollTop;
    const scrollLeft = (target) => target.scrollLeft;
    function emitData(target) {
        const el = target instanceof Document ? document.documentElement : target;
        emitterHook(emit, {
            type: RecordType.SCROLL,
            data: {
                id: nodeStore.getNodeId(target) || null,
                top: scrollTop(el),
                left: scrollLeft(el)
            },
            time: getTime().toString()
        });
    }
    emitData(document);
    function handleFn(e) {
        const { type, target } = e;
        if (type === 'scroll') {
            emitData(target);
        }
    }
    registerEvent(['scroll'], handleFn, { capture: true });
}
function mouseWatcher(emit) {
    function mouseMove() {
        const evt = (e) => {
            emitterHook(emit, {
                type: RecordType.MOUSE,
                data: {
                    type: MouseEventType.MOVE,
                    x: e.x,
                    y: e.y
                },
                time: getTime().toString()
            });
        };
        const name = 'mousemove';
        const listenerHandle = throttle(evt, 300, {
            trailing: true
        });
        document.addEventListener(name, listenerHandle);
        listenerStore.add(() => {
            document.removeEventListener(name, listenerHandle);
        });
    }
    function mouseClick() {
        const evt = (e) => {
            emitterHook(emit, {
                type: RecordType.MOUSE,
                data: {
                    type: MouseEventType.CLICK,
                    id: nodeStore.getNodeId(e.target),
                    x: e.x,
                    y: e.y
                },
                time: getTime().toString()
            });
        };
        const name = 'click';
        const listenerHandle = throttle(evt, 250);
        listenerStore.add(() => {
            document.removeEventListener(name, listenerHandle);
        });
        document.addEventListener(name, listenerHandle);
    }
    mouseMove();
    mouseClick();
}
function mutationCallback(records, emit) {
    const addNodesSet = new Set();
    const removeNodesMap = new Map();
    const moveNodesSet = new Set();
    const moveMarkSet = new Set();
    const attrNodesArray = [];
    const textNodesSet = new Set();
    function deepAdd(n, target) {
        const id = nodeStore.getNodeId(n);
        if (id) {
            if (target) {
                moveNodesSet.add(n);
                removeNodesMap.delete(n);
                const targetId = nodeStore.getNodeId(target);
                if (targetId) {
                    moveMarkSet.add(targetId + '@' + id);
                }
            }
        }
        else {
            addNodesSet.add(n);
        }
        n.childNodes.forEach(cn => deepAdd(cn));
    }
    function deepDeleteInSet(set, n) {
        set.delete(n);
        n.childNodes.forEach(cn => {
            deepDeleteInSet(set, cn);
        });
    }
    function rmNode(n, target) {
        if (!n) {
            return;
        }
        const id = nodeStore.getNodeId(n);
        const pId = nodeStore.getNodeId(n.parentNode);
        if (addNodesSet.has(n)) {
            deepDeleteInSet(addNodesSet, n);
            removeNodesMap.set(n, target);
        }
        else if (moveNodesSet.has(n) && moveMarkSet.has(pId + '@' + id)) {
            deepDeleteInSet(moveNodesSet, n);
            moveMarkSet.delete(pId + '@' + id);
        }
        else {
            removeNodesMap.set(n, target);
        }
    }
    records.forEach(record => {
        const { target, addedNodes, removedNodes, type, attributeName, oldValue } = record;
        switch (type) {
            case 'attributes':
                attrNodesArray.push({ key: attributeName, node: target, oldValue });
                break;
            case 'characterData':
                textNodesSet.add(target);
                break;
            case 'childList':
                addedNodes.forEach(n => deepAdd(n, target));
                removedNodes.forEach(n => rmNode(n, target));
                break;
            default:
                break;
        }
    });
    const addedSiblingMap = new Map();
    addNodesSet.forEach(node => {
        const vn = createFlatVNode(node);
        addedSiblingMap.set(node, vn);
    });
    const addedNodes = [];
    const addedVNodesMap = new Map();
    addNodesSet.forEach(node => {
        const parentId = nodeStore.getNodeId(node.parentNode);
        const parentVn = addedVNodesMap.get(parentId);
        const isParentSVG = parentVn && parentVn.extra.isSVG;
        let vn = addedSiblingMap.get(node);
        if (isParentSVG && isVNode(vn)) {
            ;
            vn.extra.isSVG = true;
        }
        addedNodes.push({
            parentId,
            nextId: nodeStore.getNodeId(node.nextSibling) || null,
            node: vn
        });
        if (isVNode(vn)) {
            addedVNodesMap.set(vn.id, vn);
        }
    });
    const movedNodes = [];
    moveNodesSet.forEach(node => {
        const nodeId = nodeStore.getNodeId(node);
        movedNodes.push({
            parentId: nodeStore.getNodeId(node.parentNode),
            nextId: nodeStore.getNodeId(node.nextSibling) || null,
            id: nodeId
        });
    });
    const removedNodes = [];
    removeNodesMap.forEach((parent, node) => {
        const id = nodeStore.getNodeId(node);
        const parentId = nodeStore.getNodeId(parent);
        if (parentId) {
            removedNodes.push({
                parentId,
                id
            });
        }
    });
    const attrs = attrNodesArray
        .map(data => {
        const { node, key, oldValue } = data;
        if (isExistingNode(node)) {
            const value = node.getAttribute(key);
            if (oldValue === value) {
                return null;
            }
            const id = nodeStore.getNodeId(node);
            return {
                id,
                key,
                value
            };
        }
    })
        .filter(Boolean);
    const texts = [...textNodesSet]
        .map(textNode => {
        if (isExistingNode(textNode) && textNode.parentNode) {
            return {
                id: nodeStore.getNodeId(textNode),
                parentId: nodeStore.getNodeId(textNode.parentNode),
                value: textNode.textContent
            };
        }
    })
        .filter(Boolean);
    const data = {
        addedNodes,
        movedNodes,
        removedNodes,
        attrs,
        texts
    };
    if (Object.values(data).some(item => item.length)) {
        emitterHook(emit, {
            type: RecordType.DOM_UPDATE,
            data,
            time: getTime().toString()
        });
    }
}
function DOMWatcher(emit) {
    const Watcher = new MutationObserver(callback => mutationCallback(callback, emit));
    Watcher.observe(document.documentElement, {
        attributeOldValue: true,
        attributes: true,
        characterData: true,
        characterDataOldValue: true,
        childList: true,
        subtree: true
    });
    listenerStore.add(() => Watcher.disconnect());
}
function formElementWatcher(emit) {
    listenInputs(emit);
    kidnapInputs(emit);
}
function listenInputs(emit) {
    const eventTypes = ['input', 'change', 'focus', 'blur'];
    eventTypes
        .map(type => (fn) => {
        document.addEventListener(type, fn, { once: false, passive: true, capture: true });
    })
        .forEach(handle => handle(handleFn));
    listenerStore.add(() => {
        eventTypes.forEach(type => {
            document.removeEventListener(type, handleFn, true);
        });
    });
    function handleFn(e) {
        const eventType = e.type;
        let data;
        switch (eventType) {
            case 'input':
            case 'change':
                data = {
                    type: RecordType.FORM_EL_UPDATE,
                    data: {
                        type: FormElementEvent.INPUT,
                        id: nodeStore.getNodeId(e.target),
                        value: e.target.value
                    },
                    time: getTime().toString()
                };
                break;
            case 'focus':
                data = {
                    type: RecordType.FORM_EL_UPDATE,
                    data: {
                        type: FormElementEvent.FOCUS,
                        id: nodeStore.getNodeId(e.target)
                    },
                    time: getTime().toString()
                };
                break;
            case 'blur':
                data = {
                    type: RecordType.FORM_EL_UPDATE,
                    data: {
                        type: FormElementEvent.BLUR,
                        id: nodeStore.getNodeId(e.target)
                    },
                    time: getTime().toString()
                };
                break;
            default:
                break;
        }
        emitterHook(emit, data);
    }
}
function kidnapInputs(emit) {
    const elementList = [
        [HTMLInputElement.prototype, 'value'],
        [HTMLInputElement.prototype, 'checked'],
        [HTMLSelectElement.prototype, 'value'],
        [HTMLTextAreaElement.prototype, 'value']
    ];
    const handles = elementList.map(item => {
        return () => {
            const [target, key] = item;
            const original = Object.getOwnPropertyDescriptor(target, key);
            Object.defineProperty(target, key, {
                set: function (value) {
                    setTimeout(() => {
                        handleEvent.call(this, key, value);
                    });
                    if (original && original.set) {
                        original.set.call(this, value);
                    }
                }
            });
            listenerStore.add(() => {
                if (original) {
                    Object.defineProperty(target, key, original);
                }
            });
        };
    });
    handles.concat([]).forEach(handle => handle());
    function handleEvent(key, value) {
        const data = {
            type: FormElementEvent.PROP,
            id: nodeStore.getNodeId(this),
            key,
            value
        };
        emit({
            type: RecordType.FORM_EL_UPDATE,
            data,
            time: getTime().toString()
        });
    }
}
export const watchers = {
    windowWatcher,
    scrollWatcher,
    mouseWatcher,
    DOMWatcher,
    formElementWatcher
};
