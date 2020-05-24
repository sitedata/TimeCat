import { completionAttrHref, completionCssHref, proxyResource } from '@TimeCat/utils';
export function setAttribute(node, name, value) {
    if (node.nodeType !== Node.ELEMENT_NODE) {
        return;
    }
    if (name === 'style') {
        if (typeof value === 'string') {
            node.style.cssText = completionCssHref(value);
        }
        else if (value !== null && typeof value === 'object') {
            for (const [k, v] of Object.entries(value)) {
                node.style[k] = v;
            }
        }
        return;
    }
    if (value && typeof value === 'string' && /\.js$/.test(value)) {
        return;
    }
    if (!/^[\w\-\d]+$/.test(name)) {
        return;
    }
    if (/^on\w+$/.test(name)) {
        return;
    }
    if (value === null) {
        return node.removeAttribute(name);
    }
    value = String(value);
    if (name === 'href') {
        value = completionAttrHref(String(value));
    }
    if (name === 'background' || name === 'src') {
        if (value.startsWith('data:')) {
        }
        else {
            value = proxyResource(completionAttrHref(String(value)));
        }
    }
    if (name === 'srcset') {
        const srcArray = value.split(',');
        value = srcArray.map(src => proxyResource(completionAttrHref(src.trim()))).toString();
    }
    if (value.startsWith('/')) {
        value = completionAttrHref(value);
    }
    return node.setAttribute(name, value);
}
