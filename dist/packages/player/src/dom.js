import { RecordType, MouseEventType, FormElementEvent } from '@TimeCat/record';
import { nodeStore, isElementNode, isExistingNode, delay, isVNode } from '@TimeCat/utils';
import { setAttribute, createNode, createSpecialNode } from '@TimeCat/virtual-dom';
function insertOrMoveNode(data, orderSet) {
    const { parentId, nextId, node } = data;
    const parentNode = nodeStore.getNode(parentId);
    if (parentNode && isElementNode(parentNode)) {
        let nextNode = null;
        if (nextId) {
            if (orderSet.has(nextId)) {
                return 'revert';
            }
            nextNode = findNextNode(nextId);
            if (!nextNode) {
                return 'revert';
            }
        }
        const n = node;
        let insertNode;
        if (typeof node === 'number') {
            insertNode = nodeStore.getNode(node);
            if (orderSet.has(node)) {
                orderSet.delete(node);
            }
        }
        else if (isVNode(n)) {
            insertNode = createNode(n);
        }
        else {
            insertNode = createSpecialNode(n);
        }
        parentNode.insertBefore(insertNode, nextNode);
    }
    else {
        return 'revert';
    }
}
function isChildNode(parentNode, childNode) {
    if (isElementNode(parentNode)) {
        const childNodes = parentNode.childNodes;
        return [...childNodes].indexOf(childNode) !== -1;
    }
    return false;
}
function findNextNode(nextId) {
    return nextId ? nodeStore.getNode(nextId) : null;
}
export async function updateDom(Record) {
    const { type, data } = Record;
    switch (type) {
        case RecordType.SCROLL: {
            const { top, left, id } = data;
            let target = id
                ? nodeStore.getNode(id)
                : this.c.sandBoxDoc.documentElement;
            const curTop = target.scrollTop;
            const behavior = Math.abs(top - curTop) > window.__ReplayData__.snapshot.height * 3 ? 'auto' : 'smooth';
            target.scrollTo({
                top,
                left,
                behavior
            });
            break;
        }
        case RecordType.WINDOW: {
            const { width, height, id } = data;
            let target;
            if (id) {
                target = nodeStore.getNode(id);
                target.style.width = width + 'px';
                target.style.height = height + 'px';
            }
            else {
                target = this.c.sandBoxDoc.body;
                this.c.resize(width, height);
            }
            break;
        }
        case RecordType.MOUSE:
            const { x, y, type } = data;
            if (type === MouseEventType.MOVE) {
                this.pointer.move(x, y);
            }
            else if (type === MouseEventType.CLICK) {
                this.pointer.click(x, y);
            }
            break;
        case RecordType.DOM_UPDATE:
            await delay(200);
            const { addedNodes, movedNodes, removedNodes, attrs, texts } = data;
            removedNodes.forEach((data) => {
                const { parentId, id } = data;
                const parentNode = nodeStore.getNode(parentId);
                const node = nodeStore.getNode(id);
                if (node && parentNode && parentNode.contains(node)) {
                    parentNode.removeChild(node);
                }
            });
            const movedList = movedNodes.slice();
            const orderSet = new Set();
            movedList.forEach(data => {
                if (data.nextId) {
                    if (movedList.some(a => a.id === data.nextId)) {
                        orderSet.add(data.nextId);
                    }
                }
            });
            const addedList = movedList
                .map(item => {
                const { id, parentId, nextId } = item;
                return {
                    node: id,
                    parentId,
                    nextId
                };
            })
                .concat(addedNodes.slice());
            const n = addedList.length;
            const maxRevertCount = n > 0 ? (n * n + n) / 2 : 0;
            let revertCount = 0;
            while (addedList.length) {
                const addData = addedList.shift();
                if (addData) {
                    const revertSignal = insertOrMoveNode(addData, orderSet);
                    if (revertSignal === 'revert') {
                        if (revertCount++ < maxRevertCount) {
                            addedList.push(addData);
                        }
                    }
                }
            }
            attrs.forEach((attr) => {
                const { id, key, value } = attr;
                const node = nodeStore.getNode(id);
                if (node) {
                    setAttribute(node, key, value);
                }
            });
            texts.forEach((text) => {
                const { id, value, parentId } = text;
                const parentNode = nodeStore.getNode(parentId);
                const node = nodeStore.getNode(id);
                if (parentNode && node) {
                    if (isExistingNode(node)) {
                        node.textContent = value;
                        return;
                    }
                    parentNode.innerText = value;
                }
            });
            break;
        case RecordType.FORM_EL_UPDATE:
            await delay(200);
            const { id, key, type: formType, value } = data;
            const node = nodeStore.getNode(id);
            if (node) {
                if (formType === FormElementEvent.INPUT) {
                    node.value = value;
                }
                else if (formType === FormElementEvent.FOCUS) {
                    node.focus();
                }
                else if (formType === FormElementEvent.BLUR) {
                    node.blur();
                }
                else if (formType === FormElementEvent.PROP) {
                    if (key) {
                        ;
                        node[key] = value;
                    }
                }
            }
            break;
    }
}
