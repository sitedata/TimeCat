import { isDev } from './common';
const snapshot = () => window.__ReplayData__ && window.__ReplayData__.snapshot;
const origin = () => (snapshot() && snapshot().origin) || location.origin;
const protocol = () => origin().match(/.*?\/\//)[0] || location.protocol;
const href = () => origin() + ((snapshot() && snapshot().pathname) || location.pathname);
export function filteringTemplate(tpl) {
    const reg = /<!--env-->[\s\S]*<!--env-->/g;
    if (isDev) {
        tpl = tpl.replace(reg, '');
    }
    return tpl;
}
export function isCommentNode(node) {
    return node.nodeType === Node.COMMENT_NODE;
}
export function isElementNode(node) {
    return node.nodeType === Node.ELEMENT_NODE;
}
export function isTextNode(node) {
    return node.nodeType === Node.TEXT_NODE;
}
export function filteringScriptTag(str) {
    const reg = /<\/script>/g;
    return str.replace(reg, '<\\/script>');
}
function startsWithSlash(str) {
    return /^\/(?!\/)/.test(str);
}
function startsWithDoubleSlash(str) {
    return /^\/\//.test(str);
}
export function proxyResource(url) {
    const { proxy } = window.__ReplayOptions__;
    if (proxy) {
        const proxyUrl = stitchingLink(proxy, url);
        return proxyUrl;
    }
    return url;
}
function stitchingLink(pre, next) {
    if (pre.endsWith('/') || next.startsWith('/')) {
        return pre + next;
    }
    return pre + '/' + next;
}
export function completionCssHref(str) {
    return str.replace(/(url\()['"]?((\/{1,2})[^'"]*?)['"]?(?=\))/g, (a, b, c) => {
        let url = '';
        if (startsWithDoubleSlash(c)) {
            url = stitchingLink(protocol(), c.substring(2));
        }
        else if (startsWithSlash(c)) {
            url = stitchingLink(origin(), c.substring(1));
        }
        if (url) {
            return a.replace(c, url);
        }
        return a;
    });
}
export function completionAttrHref(str) {
    if (str.startsWith('data')) {
        return str;
    }
    const reg = /^(\/{1,2}.*)/g;
    str = str.replace(reg, str => {
        if (startsWithDoubleSlash(str)) {
            return stitchingLink(protocol(), str.substring(2));
        }
        if (startsWithSlash(str)) {
            return stitchingLink(origin(), str);
        }
        return str;
    });
    if (!/^http/.test(str)) {
        if (str.startsWith('./')) {
            return stitchingLink(href(), str.substring(1));
        }
        else {
            return stitchingLink(origin(), str);
        }
    }
    return str;
}
export function isHideComment(node) {
    if (!node) {
        return false;
    }
    return node.nodeType === Node.COMMENT_NODE && node.textContent === 'hidden';
}
export function isExistingNode(node) {
    return node.ownerDocument && !!node.ownerDocument.contains(node);
}
