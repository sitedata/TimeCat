import { setAttribute } from './dom';
import { nodeStore, isDev, isHideComment, completionCssHref } from '@TimeCat/utils';
export function convertVNode(vNode, parent) {
    if (vNode === null || vNode === undefined) {
        return null;
    }
    const vs = vNode;
    if (vNode.type === Node.COMMENT_NODE) {
        return createCommentNode(vs);
    }
    if (vNode.type === Node.TEXT_NODE) {
        if (parent && parent.tag === 'style') {
            vs.value = completionCssHref(vs.value);
        }
        return createText(vs);
    }
    const vn = vNode;
    const output = createNode(vn);
    if ((vn.children && vn.children.length) || (output.childNodes && output.childNodes.length)) {
        travel(vn, output);
    }
    return output;
}
function travel(vNode, node) {
    const nodeChildren = [];
    const vNodeChildren = vNode.children.slice();
    vNodeChildren.forEach(vChild => {
        let child = nodeChildren.pop();
        child = convertVNode(vChild, vNode);
        if (child) {
            if (isHideComment(node.lastChild)) {
                setAttribute(child, 'style', 'visibility: hidden');
            }
            node.appendChild(child);
        }
    });
}
function createProps(vNode, node) {
    const { props } = vNode.extra;
    if (props) {
        for (let [key, val] of Object.entries(props)) {
            ;
            node[key] = val;
        }
    }
}
function createAttributes(vNode, node) {
    const { attrs } = vNode;
    for (const [name, val] of Object.entries(attrs)) {
        setAttribute(node, name, val);
    }
    if (vNode.tag === 'a') {
        setAttribute(node, 'target', '_blank');
    }
}
export function createSpecialNode(vsNode) {
    const { type, value, id } = vsNode;
    let output;
    switch (type) {
        case Node.TEXT_NODE:
            output = document.createTextNode(value);
            break;
        case Node.COMMENT_NODE:
            output = document.createComment(value);
            break;
    }
    nodeStore.updateNode(id, output);
    return output;
}
export function createNode(vNode) {
    const { id, extra } = vNode;
    const { isSVG } = extra;
    let output;
    const tagName = transformTagName(vNode.tag);
    if (isSVG) {
        output = document.createElementNS('http://www.w3.org/2000/svg', tagName);
    }
    else {
        output = document.createElement(tagName);
    }
    if (isDev) {
        setAttribute(output, 'vid', id.toString());
    }
    createAttributes(vNode, output);
    createProps(vNode, output);
    nodeStore.updateNode(id, output);
    return output;
}
function transformTagName(tag) {
    const tagMap = {
        script: 'noscript'
    };
    const tagName = tagMap[tag] || tag;
    return tagName;
}
function createText(vs) {
    const { value, id } = vs;
    let output;
    output = document.createTextNode(value);
    nodeStore.updateNode(id, output);
    return output;
}
function createCommentNode(vs) {
    const { value, id } = vs;
    let output;
    output = document.createComment(value);
    nodeStore.updateNode(id, output);
    return output;
}
