import { nodeStore, isElementNode } from '@TimeCat/utils';
const getVNodeByEl = (el, isSVG) => {
    if (isElementNode(el)) {
        return {
            id: nodeStore.createNodeId(),
            type: el.nodeType,
            attrs: getAttr(el),
            tag: el.tagName.toLocaleLowerCase(),
            children: [],
            extra: getExtra(el, isSVG)
        };
    }
    else {
        return {
            id: nodeStore.createNodeId(),
            type: el.nodeType,
            value: el.textContent
        };
    }
};
const getAttr = (el) => {
    const resAttr = {};
    const attrs = el.attributes;
    if (attrs && attrs.length) {
        return Object.values(attrs).reduce((ret, attr) => {
            const [name, value] = extraAttr(attr);
            if (name) {
                ret[name] = value;
            }
            return ret;
        }, resAttr);
    }
    return resAttr;
};
function getExtra(node, isSVG) {
    const { tagName } = node;
    const extra = {};
    if (isSVG || tagName.toLowerCase() === 'svg') {
        extra.isSVG = true;
    }
    if (tagName === 'INPUT') {
        const props = {};
        const { checked, value } = node;
        if (value !== undefined) {
            props.value = value;
        }
        if (checked !== undefined) {
            props.checked = checked;
        }
        if (Object.keys(props).length) {
            extra.props = props;
        }
    }
    return extra;
}
const extraAttr = (attr) => {
    let { name, value } = attr;
    if (name === 'href' || name === 'src') {
        if (value.startsWith('#/')) {
            return [];
        }
        return [name, value];
    }
    if (name === 'style') {
        return [name, value];
    }
    return [name, value];
};
export const createFlatVNode = (el, isSVG = false) => {
    const vNode = getVNodeByEl(el, isSVG);
    const { id } = vNode;
    nodeStore.addNode(el, id);
    return vNode;
};
export const createElement = (el, inheritSVG) => {
    const vNode = getVNodeByEl(el, inheritSVG);
    const { id } = vNode;
    nodeStore.addNode(el, id);
    if (vNode.type === Node.ELEMENT_NODE) {
        const vn = vNode;
        inheritSVG = inheritSVG || vn.extra.isSVG;
        el.childNodes.forEach((node) => {
            const child = createElement(node, inheritSVG);
            if (child) {
                vn.children.push(child);
            }
        });
    }
    return vNode;
};
export const virtualDOM = {
    createElement
};
