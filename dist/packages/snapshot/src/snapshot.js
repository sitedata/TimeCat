import { createElement } from '@TimeCat/virtual-dom';
function getInitInfo() {
    const { name, publicId, systemId } = window.document.doctype;
    const doctype = () => ({ name, publicId, systemId });
    const origin = () => window.location.origin;
    const pathname = () => window.location.pathname;
    const width = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const scrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const scrollLeft = () => window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
    return {
        doctype: doctype(),
        origin: origin(),
        pathname: pathname(),
        scrollTop: scrollTop(),
        scrollLeft: scrollLeft(),
        width: width(),
        height: height()
    };
}
function DOMSnapshot() {
    return {
        vNode: createElement(document.documentElement)
    };
}
export const snapshots = {
    getInitInfo,
    DOMSnapshot
};
